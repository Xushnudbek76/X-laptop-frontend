import { useState, useMemo, useRef } from "react";
import {
  Box, Container, Typography, InputBase,
  Select, MenuItem, Chip, Slider,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";



const CATEGORIES = ["All", "Gaming", "Business", "Ultrabook", "Creator", "Budget"];
const RAM_OPTIONS = ["All", "8GB", "16GB", "32GB", "64GB"];
const STORAGE_OPTIONS = ["All", "256GB", "512GB", "1TB", "2TB"];

const PRODUCTS = [
  { id: 1,  name: "ProBook X1",        category: "Business",  price: 1299, views: 1420, rating: 4.5, badge: "New",  stock: true,  ram: "16GB", storage: "512GB", img: "https://picsum.photos/seed/laptop1/400/280"  },
  { id: 2,  name: "MacBook Pro 14",    category: "Creator",   price: 2499, views: 3210, rating: 4.9, badge: "Hot",  stock: true,  ram: "32GB", storage: "1TB",   img: "https://picsum.photos/seed/laptop2/400/280"  },
  { id: 3,  name: "XPS 15",            category: "Creator",   price: 1899, views: 2100, rating: 4.7, badge: null,   stock: true,  ram: "32GB", storage: "1TB",   img: "https://picsum.photos/seed/laptop3/400/280"  },
  { id: 4,  name: "ThinkPad X1 Carbon",category: "Business",  price: 1599, views: 980,  rating: 4.6, badge: "Sale", stock: false, ram: "16GB", storage: "512GB", img: "https://picsum.photos/seed/laptop4/400/280"  },
  { id: 5,  name: "ROG Zephyrus",      category: "Gaming",    price: 2199, views: 4500, rating: 4.8, badge: "Hot",  stock: true,  ram: "32GB", storage: "1TB",   img: "https://picsum.photos/seed/laptop5/400/280"  },
  { id: 6,  name: "Blade 15",          category: "Gaming",    price: 2899, views: 3800, rating: 4.7, badge: null,   stock: true,  ram: "64GB", storage: "2TB",   img: "https://picsum.photos/seed/laptop6/400/280"  },
  { id: 7,  name: "Swift Edge 16",     category: "Ultrabook", price: 999,  views: 760,  rating: 4.3, badge: "Sale", stock: true,  ram: "8GB",  storage: "256GB", img: "https://picsum.photos/seed/laptop7/400/280"  },
  { id: 8,  name: "Galaxy Book4",      category: "Budget",    price: 749,  views: 540,  rating: 4.1, badge: "New",  stock: true,  ram: "8GB",  storage: "256GB", img: "https://picsum.photos/seed/laptop8/400/280"  },
  { id: 9,  name: "Spectre x360",      category: "Ultrabook", price: 1749, views: 1200, rating: 4.6, badge: null,   stock: true,  ram: "16GB", storage: "512GB", img: "https://picsum.photos/seed/laptop9/400/280"  },
  { id: 10, name: "Legion Pro 7",      category: "Gaming",    price: 2599, views: 5100, rating: 4.9, badge: "Hot",  stock: true,  ram: "32GB", storage: "1TB",   img: "https://picsum.photos/seed/laptop10/400/280" },
  { id: 11, name: "ZBook Fury",        category: "Creator",   price: 3199, views: 890,  rating: 4.5, badge: null,   stock: false, ram: "64GB", storage: "2TB",   img: "https://picsum.photos/seed/laptop11/400/280" },
  { id: 12, name: "IdeaPad Slim 5",    category: "Budget",    price: 599,  views: 430,  rating: 4.0, badge: "Sale", stock: true,  ram: "8GB",  storage: "256GB", img: "https://picsum.photos/seed/laptop12/400/280" },
];

const ITEMS_PER_PAGE = 8;

const badgeColors: Record<string, { bg: string; color: string }> = {
  New:  { bg: "rgba(34,197,94,0.15)",  color: "#4ade80" },
  Hot:  { bg: "rgba(239,68,68,0.15)",  color: "#f87171" },
  Sale: { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
};

interface Props {
  search: string; setSearch: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  sort: string; setSort: (v: string) => void;
  priceRange: [number, number]; setPriceRange: (v: [number, number]) => void;
  ram: string; setRam: (v: string) => void;
  storage: string; setStorage: (v: string) => void;
  page: number; setPage: (v: number) => void;
}

export default function LaptopList({
  search, setSearch, category, setCategory,
  sort, setSort, priceRange, setPriceRange,
  ram, setRam, storage, setStorage,
  page, setPage,
}: Props) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartAdded, setCartAdded] = useState<number[]>([]);
  const [gridView, setGridView] = useState(true);
  const swiperRef = useRef<any>(null);

  const navigate = useNavigate();
  
  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || p.category === category) &&
        (ram === "All" || p.ram === ram) &&
        (storage === "All" || p.storage === storage) &&
        p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    });
    if (sort === "price-asc")  result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "views")      result = [...result].sort((a, b) => b.views - a.views);
    if (sort === "rating")     result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, sort, priceRange, ram, storage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const addToCart = (id: number) => {
    setCartAdded((prev) => [...prev, id]);
    setTimeout(() => setCartAdded((prev) => prev.filter((x) => x !== id)), 1500);
  };

  const resetFilters = () => {
    setSearch(""); setCategory("All"); setSort("default");
    setPriceRange([0, 5000]); setRam("All"); setStorage("All"); setPage(1);
  };

  const FilterChips = ({ label, options, value, onChange }: {
    label: string; options: string[]; value: string; onChange: (v: string) => void;
  }) => (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", mb: 1.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            onClick={() => { onChange(opt); setPage(1); }}
            size="small"
            sx={{
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              bgcolor: value === opt ? "#3b82f6" : "rgba(255,255,255,0.05)",
              color: value === opt ? "#fff" : "#94a3b8",
              border: `1px solid ${value === opt ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
              "&:hover": { bgcolor: value === opt ? "#2563eb" : "rgba(255,255,255,0.08)" },
              transition: "all 0.2s",
            }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* Page Header */}
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: 3, textTransform: "uppercase", mb: 1 }}>
            Our Collection
          </Typography>
          <Box sx={{
            display: "flex", alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, gap: 1,
          }}>
            <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 900, color: "#fff" }}>
              All Laptops
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              Showing {paginated.length} of {filtered.length} results
            </Typography>
          </Box>
        </Box>

        {/* Search + Sort + View Toggle */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
          <Box sx={{
            flex: 1, minWidth: "200px", display: "flex", alignItems: "center", gap: 1.5,
            bgcolor: "#1e293b", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)", px: 2, py: 1.2,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <InputBase
              placeholder="Search laptops..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              sx={{ flex: 1, color: "#fff", fontSize: 14, "& input::placeholder": { color: "#64748b" } }}
            />
            {search && (
              <Box onClick={() => setSearch("")} sx={{ cursor: "pointer", color: "#64748b", fontSize: 18, lineHeight: 1 }}>×</Box>
            )}
          </Box>

          <Select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            size="small"
            sx={{
              color: "#94a3b8", fontSize: 13, borderRadius: "12px",
              bgcolor: "#1e293b", border: "1px solid rgba(255,255,255,0.07)",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiSvgIcon-root": { color: "#64748b" },
              minWidth: 160,
            }}
          >
            <MenuItem value="default">Sort: Default</MenuItem>
            <MenuItem value="price-asc">Price: Low → High</MenuItem>
            <MenuItem value="price-desc">Price: High → Low</MenuItem>
            <MenuItem value="views">Most Viewed</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
          </Select>

          {/* Grid/List toggle */}

            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {[true, false].map((isGrid) => (
              <Box
                key={String(isGrid)}
                onClick={() => setGridView(isGrid)}
                sx={{
                  width: 36, height: 36, borderRadius: "10px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  bgcolor: gridView === isGrid ? "rgba(59,130,246,0.2)" : "#1e293b",
                  border: `1px solid ${gridView === isGrid ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.2s",
                }}
              >
                {isGrid ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={gridView ? "#3b82f6" : "#64748b"} strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={!gridView ? "#3b82f6" : "#64748b"} strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </Box>
            ))}
          </Box>

          {/* Reset filters */}
          <Box
            onClick={resetFilters}
            sx={{
              fontSize: 12, color: "#f87171", cursor: "pointer", fontWeight: 600,
              bgcolor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "10px", px: 2, py: 1, transition: "all 0.2s",
              "&:hover": { bgcolor: "rgba(239,68,68,0.15)" },
            }}
          >
            Reset
          </Box>
        </Box>

        {/* Category Filter */}
        <FilterChips label="Category" options={CATEGORIES} value={category} onChange={setCategory} />

        {/* RAM Filter */}
        <FilterChips label="RAM" options={RAM_OPTIONS} value={ram} onChange={setRam} />

        {/* Storage Filter */}
        <FilterChips label="Storage" options={STORAGE_OPTIONS} value={storage} onChange={setStorage} />

        {/* Price Range */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", mb: 1.5 }}>
            Price: ${priceRange[0]} — ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, v) => { setPriceRange(v as [number, number]); setPage(1); }}
            min={0} max={5000} step={50}
            sx={{
              color: "#3b82f6", maxWidth: { xs: "100%", md: "400px" },
              "& .MuiSlider-thumb": { bgcolor: "#3b82f6", width: 16, height: 16 },
              "& .MuiSlider-track": { bgcolor: "#3b82f6" },
              "& .MuiSlider-rail": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          />
        </Box>

        {/* Products Grid */}
        {paginated.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography sx={{ color: "#64748b", fontSize: 16 }}>No laptops found. Try adjusting your filters.</Typography>
            <Box onClick={resetFilters} sx={{ mt: 2, color: "#3b82f6", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
              Clear all filters
            </Box>
          </Box>
        ) : (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: gridView
            ? { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }
            : "1fr",  
            gap: { xs: 2, md: 3 },
            mb: 5,
          }}>
            {paginated.map((product) => (
              <Box
                key={product.id}
                onClick={() => navigate(`${product.id}`)}
                sx={{
                  bgcolor: "#1e293b", borderRadius: "16px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.25s ease", cursor: "pointer",
                  display: gridView ? "block" : "flex",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(59,130,246,0.15)",
                    borderColor: "rgba(59,130,246,0.3)",
                  },
                }}
              >
                {/* Image */}
                <Box sx={{
                  position: "relative",
                  width: gridView ? "100%" : { xs: "130px", sm: "200px" },
                  minWidth: gridView ? "unset" : { xs: "130px", sm: "200px" },
                  height: gridView ? { xs: "220px", sm: "200px", md: "220px" } : { xs: "150px", sm: "180px" },
                  overflow: "hidden", flexShrink: 0,
                }}>
                  <Box
                    component="img"
                    src={product.img}
                    alt={product.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <Box sx={{
                      position: "absolute", top: 10, left: 10,
                      px: 1, py: 0.3, borderRadius: "6px", fontSize: 10, fontWeight: 700,
                      bgcolor: badgeColors[product.badge].bg,
                      color: badgeColors[product.badge].color,
                      border: `1px solid ${badgeColors[product.badge].color}40`,
                    }}>
                      {product.badge}
                    </Box>
                  )}

                  {/* Out of Stock */}
                  {!product.stock && (
                    <Box sx={{
                      position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.55)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Typography sx={{ color: "#f87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                        Out of Stock
                      </Typography>
                    </Box>
                  )}

                  {/* Wishlist */}
                  <Box
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    sx={{
                      position: "absolute", top: 10, right: 10,
                      width: 28, height: 28, borderRadius: "8px",
                      bgcolor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "all 0.2s",
                      "&:hover": { bgcolor: "rgba(239,68,68,0.3)" },
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? "#f87171" : "none"} stroke={wishlist.includes(product.id) ? "#f87171" : "#94a3b8"} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ p: { xs: 2, md: 2.5 }, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1.5 }}>
                  <Box>
                    <Typography sx={{
                                    fontSize: { xs: 14, md: 15 }, fontWeight: 700, color: "#fff", mb: 0.5,
                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}>
                      {product.name}
                    </Typography>

                    {/* RAM + Storage badges */}
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1 }}>
                      <Box sx={{ fontSize: 10, fontWeight: 600, color: "#93c5fd", bgcolor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "5px", px: 0.8, py: 0.2 }}>
                        {product.ram}
                      </Box>
                      <Box sx={{ fontSize: 10, fontWeight: 600, color: "#93c5fd", bgcolor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "5px", px: 0.8, py: 0.2 }}>
                        {product.storage}
                      </Box>
                    </Box>

                    {/* Rating + Views */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <Typography sx={{ fontSize: 11, color: "#fbbf24", fontWeight: 600 }}>{product.rating}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        <Typography sx={{ fontSize: 11, color: "#64748b" }}>{product.views.toLocaleString()}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Price + Cart */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
                    <Typography sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 800, color: "#3b82f6" }}>
                      ${product.price.toLocaleString()}
                    </Typography>
                    <Box
                      onClick={(e) => { e.stopPropagation(); if (product.stock) addToCart(product.id); }}
                      sx={{
                        display: "flex", alignItems: "center", gap: 0.6,
                        px: { xs: 1, md: 1.5 }, py: 0.7, borderRadius: "8px", cursor: product.stock ? "pointer" : "not-allowed",
                        bgcolor: cartAdded.includes(product.id) ? "rgba(34,197,94,0.15)" : product.stock ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${cartAdded.includes(product.id) ? "rgba(34,197,94,0.4)" : product.stock ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.1)"}`,
                        transition: "all 0.2s",
                        "&:hover": product.stock ? { bgcolor: "#3b82f6", "& svg": { stroke: "#fff" }, "& span": { color: "#fff" } } : {},
                      }}
                    >
                      {cartAdded.includes(product.id) ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={product.stock ? "#93c5fd" : "#475569"} strokeWidth="2" strokeLinecap="round">
                          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                      )}
                      <Box component="span" sx={{ fontSize: 11, fontWeight: 600, color: cartAdded.includes(product.id) ? "#4ade80" : product.stock ? "#93c5fd" : "#475569" }}>
                        {cartAdded.includes(product.id) ? "Added!" : "Cart"}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Pagination Swiper */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
            <Box
              onClick={() => { if (page > 1) { setPage(page - 1); swiperRef.current?.slidePrev(); } }}
              sx={{
                width: 40, height: 40, borderRadius: "50%", cursor: page > 1 ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                bgcolor: "rgba(59,130,246,0.1)", border: "1.5px solid rgba(59,130,246,0.3)",
                color: page > 1 ? "#93c5fd" : "#334155", fontSize: 20, transition: "all 0.2s",
                "&:hover": page > 1 ? { bgcolor: "rgba(59,130,246,0.25)", borderColor: "#3b82f6" } : {},
              }}
            >‹</Box>

            <Box sx={{ overflow: "hidden", maxWidth: { xs: "200px", sm: "320px" } }}>
              <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                modules={[Pagination]}
                slidesPerView="auto"
                spaceBetween={8}
                centeredSlides={true}
                style={{ padding: "4px 8px" }}
              >
                {Array.from({ length: totalPages }).map((_, i) => (
                  <SwiperSlide key={i} style={{ width: "auto" }}>
                    <Box
                      onClick={() => { setPage(i + 1); swiperRef.current?.slideTo(i); }}
                      sx={{
                        width: 36, height: 36, borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", fontSize: 13, fontWeight: 700,
                        bgcolor: page === i + 1 ? "#3b82f6" : "rgba(255,255,255,0.05)",
                        color: page === i + 1 ? "#fff" : "#64748b",
                        border: `1px solid ${page === i + 1 ? "#3b82f6" : "rgba(255,255,255,0.08)"}`,
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: page === i + 1 ? "#2563eb" : "rgba(255,255,255,0.1)" },
                      }}
                    >
                      {i + 1}
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <Box
              onClick={() => { if (page < totalPages) { setPage(page + 1); swiperRef.current?.slideNext(); } }}
              sx={{
                width: 40, height: 40, borderRadius: "50%", cursor: page < totalPages ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                bgcolor: "rgba(59,130,246,0.1)", border: "1.5px solid rgba(59,130,246,0.3)",
                color: page < totalPages ? "#93c5fd" : "#334155", fontSize: 20, transition: "all 0.2s",
                "&:hover": page < totalPages ? { bgcolor: "rgba(59,130,246,0.25)", borderColor: "#3b82f6" } : {},
              }}
            >›</Box>
          </Box>
        )}

      </Container>
    </Box>
  );
}