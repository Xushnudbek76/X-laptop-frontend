import { type ChangeEvent, useEffect, useState } from "react";
import {
  Box, Container, Typography, InputBase,
  Select, MenuItem, Chip, Pagination, PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type Dispatch, createSelector } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import type { Item, ProductInquiry } from "../../../lib/types/item";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import ItemService from "../../services/ProductService";
import { LaptopCategory, LaptopRam, LaptopStorage } from "../../../lib/enums/item.enum";
import type { CartItem } from "../../../lib/types/cart";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Item[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const CATEGORIES = ["All", ...Object.values(LaptopCategory)];
const RAM_VALUES = Object.values(LaptopRam).filter(
  (value): value is LaptopRam => typeof value === "number",
);
const STORAGE_VALUES = Object.values(LaptopStorage).filter(
  (value): value is LaptopStorage => typeof value === "number",
);
const RAM_OPTIONS = ["All", ...RAM_VALUES.map(String)];
const STORAGE_OPTIONS = ["All", ...STORAGE_VALUES.map(String)];

const formatRamLabel = (value: string) => (value === "All" ? value : `${value} GB`);
const formatStorageLabel = (value: string) => {
  if (value === "All") return value;
  const storage = Number(value);
  return storage >= 1000 ? `${storage / 1000} TB` : `${storage} GB`;
};

const FilterChips = ({ label, options, value, onChange, getLabel }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; getLabel?: (v: string) => string;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", mb: 1.5 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <Chip
          key={opt}
          label={getLabel ? getLabel(opt) : opt}
          onClick={() => onChange(opt)}
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

interface ItemsProps {
  handleAddToCart: (product: CartItem) => void;
}

export default function LaptopList(props: ItemsProps) {
  const { handleAddToCart } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const navigate = useNavigate();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    laptopCategory: undefined,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [category, setCategory] = useState("All");
  const [ram, setRam] = useState("All");
  const [storage, setStorage] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartAdded, setCartAdded] = useState<string[]>([]);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    const item = new ItemService();
    item.getItems(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch, setProducts]);

  useEffect(() => {
    if (searchText === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductSearch((prev) => ({ ...prev, search: "", page: 1 }));
    }
  }, [searchText]);

  const searchHandler = () => {
    setProductSearch((prev) => ({ ...prev, search: searchText, page: 1 }));
  };

  const orderHandler = (order: string) => {
    setSort(order);
    setProductSearch((prev) => ({ ...prev, order, page: 1 }));
  };

  const categoryHandler = (value: string) => {
    setCategory(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopCategory: value === "All" ? undefined : (value as LaptopCategory),
      page: 1,
    }));
  };

  const ramHandler = (value: string) => {
    setRam(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopRam: value === "All" ? undefined : Number(value) as LaptopRam,
      page: 1,
    }));
  };

  const storageHandler = (value: string) => {
    setStorage(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopStorage: value === "All" ? undefined : Number(value) as LaptopStorage,
      page: 1,
    }));
  };

  const paginationHandler = (_e: ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({ ...prev, page: value }));
  };

  const resetFilters = () => {
    setSearchText("");
    setCategory("All");
    setRam("All");
    setStorage("All");
    setSort("createdAt");
    setProductSearch({ page: 1, limit: 8, order: "createdAt", laptopCategory: undefined, search: "" });
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const addToCart = (e: React.MouseEvent, laptop: Item) => {
    e.stopPropagation();

    handleAddToCart(laptop as unknown as CartItem);

    setCartAdded((prev) =>
      prev.includes(laptop._id) ? prev : [...prev, laptop._id]
    );
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: 3, textTransform: "uppercase", mb: 1 }}>
            Our Collection
          </Typography>
          <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
            <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 900, color: "#fff" }}>
              All Laptops
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {products.length} results
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
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <InputBase
              placeholder="Search laptops..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") searchHandler(); }}
              sx={{ flex: 1, color: "#fff", fontSize: 14, "& input::placeholder": { color: "#64748b" } }}
            />
            {searchText && (
              <Box onClick={() => setSearchText("")} sx={{ cursor: "pointer", color: "#64748b", fontSize: 18, lineHeight: 1 }}>×</Box>
            )}
          </Box>

          <Select
            value={sort}
            onChange={(e) => orderHandler(e.target.value)}
            size="small"
            sx={{
              color: "#94a3b8", fontSize: 13, borderRadius: "12px",
              bgcolor: "#1e293b", border: "1px solid rgba(255,255,255,0.07)",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiSvgIcon-root": { color: "#64748b" },
              minWidth: 160,
            }}
          >
            <MenuItem value="createdAt">Sort: Newest</MenuItem>
            <MenuItem value="laptopPrice">Price: Low → High</MenuItem>
            <MenuItem value="laptopViews">Most Viewed</MenuItem>
          </Select>

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
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={!gridView ? "#3b82f6" : "#64748b"} strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </Box>
            ))}
          </Box>

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

        {/* Filters */}
        <FilterChips label="Category" options={CATEGORIES} value={category} onChange={categoryHandler} />
        <FilterChips label="RAM" options={RAM_OPTIONS} value={ram} onChange={ramHandler} getLabel={formatRamLabel} />
        <FilterChips label="Storage" options={STORAGE_OPTIONS} value={storage} onChange={storageHandler} getLabel={formatStorageLabel} />

        {/* Grid */}
        {products.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography sx={{ color: "#64748b", fontSize: 16 }}>No laptops found.</Typography>
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
            {products.map((laptop: Item) => {
              const image = `${serverApi}/${laptop.laptopImages[0]}`;
              const inStock = laptop.laptopLeftCount > 0;

              return (
                <Box
                  key={laptop._id}
                  onClick={() => navigate(`${laptop._id}`)}
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
                      src={image}
                      alt={laptop.laptopName}
                      sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }}
                    />

                    <Box sx={{
                      position: "absolute", top: 10, left: 10,
                      px: 1, py: 0.3, borderRadius: "6px", fontSize: 10, fontWeight: 700,
                      bgcolor: "rgba(37,99,235,0.15)", color: "#60a5fa",
                      border: "1px solid rgba(59,130,246,0.3)",
                    }}>
                      {laptop.laptopCondition}
                    </Box>

                    {!inStock && (
                      <Box sx={{
                        position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.55)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Typography sx={{ color: "#f87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                          Out of Stock
                        </Typography>
                      </Box>
                    )}

                    <Box
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(laptop._id); }}
                      sx={{
                        position: "absolute", top: 10, right: 10,
                        width: 28, height: 28, borderRadius: "8px",
                        bgcolor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.2s",
                        "&:hover": { bgcolor: "rgba(239,68,68,0.3)" },
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24"
                        fill={wishlist.includes(laptop._id) ? "#f87171" : "none"}
                        stroke={wishlist.includes(laptop._id) ? "#f87171" : "#94a3b8"}
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: { xs: 2, md: 2.5 }, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontSize: { xs: 14, md: 15 }, fontWeight: 700, color: "#fff", mb: 0.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {laptop.laptopName}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1 }}>
                        <Box sx={{ fontSize: 10, fontWeight: 600, color: "#93c5fd", bgcolor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "5px", px: 0.8, py: 0.2 }}>
                          {laptop.laptopRam} GB
                        </Box>
                        <Box sx={{ fontSize: 10, fontWeight: 600, color: "#93c5fd", bgcolor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "5px", px: 0.8, py: 0.2 }}>
                          {laptop.laptopStorage} GB
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                          <Typography sx={{ fontSize: 11, color: "#64748b" }}>{laptop.laptopViews.toLocaleString()}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Price + Cart */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
                      <Typography sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 800, color: "#3b82f6" }}>
                        ${laptop.laptopPrice.toLocaleString()}
                      </Typography>
                      <Box
                        onClick={(e) => { if (inStock) addToCart(e, laptop); }}
                        sx={{
                          display: "flex", alignItems: "center", gap: 0.6,
                          px: { xs: 1, md: 1.5 }, py: 0.7, borderRadius: "8px",
                          cursor: inStock ? "pointer" : "not-allowed",
                          bgcolor: cartAdded.includes(laptop._id) ? "rgba(34,197,94,0.15)" : inStock ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${cartAdded.includes(laptop._id) ? "rgba(34,197,94,0.4)" : inStock ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.1)"}`,
                          transition: "all 0.2s",
                          "&:hover": inStock ? { bgcolor: "#3b82f6", "& svg": { stroke: "#fff" }, "& span": { color: "#fff" } } : {},
                        }}
                      >
                        {cartAdded.includes(laptop._id) ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={inStock ? "#93c5fd" : "#475569"} strokeWidth="2" strokeLinecap="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        )}
                        <Box component="span" sx={{ fontSize: 11, fontWeight: 600, color: cartAdded.includes(laptop._id) ? "#4ade80" : inStock ? "#93c5fd" : "#475569" }}>
                          {cartAdded.includes(laptop._id) ? "Added!" : "Cart"}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
            page={productSearch.page}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                sx={{
                  color: "#94a3b8",
                  "&.Mui-selected": { bgcolor: "#3b82f6", color: "#fff" },
                }}
              />
            )}
            onChange={paginationHandler}
          />
        </Box>

      </Container>
    </Box>
  );
}
