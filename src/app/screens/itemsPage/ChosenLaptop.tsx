import { useState, useEffect, useRef } from "react";
import { Box, Stack, Container, Rating, Chip, Divider, Button, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation } from "swiper/modules";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import type { CartItem } from "../../../lib/types/cart";
import type { Item } from "../../../lib/types/item";
import { LaptopStatus } from "../../../lib/enums/item.enum";
import ItemService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

const itemService = new ItemService();

const reviews = [
  {
    id: 1,
    name: "Alex Kim",
    initials: "AK",
    date: "March 2024",
    rating: 5,
    text: "Absolutely incredible machine. Compiling large TypeScript projects is blazing fast. The display is gorgeous for long coding sessions.",
    tags: ["Performance", "Display"],
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Sofia R.",
    initials: "SR",
    date: "Feb 2024",
    rating: 4,
    text: "Battery life exceeded my expectations — a full workday without a charger. Runs cool even under heavy loads. Port selection could be better.",
    tags: ["Battery", "Build Quality"],
    color: "#10b981",
  },
  {
    id: 3,
    name: "Marcus J.",
    initials: "MJ",
    date: "Jan 2024",
    rating: 3,
    text: "Great hardware, steep price. Docker and WSL run smoothly. Took some time adjusting from Windows but worth it in the end.",
    tags: ["Value", "Dev Use"],
    color: "#f59e0b",
  },
];

const ratingBars = [
  { label: "5", pct: 62 },
  { label: "4", pct: 20 },
  { label: "3", pct: 10 },
  { label: "2", pct: 5 },
  { label: "1", pct: 3 },
];

interface ItemProps {
  handleAddToCart: (product: CartItem) => void;
}

export default function ChosenLaptop(props: ItemProps) {
  const { handleAddToCart } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const { laptopId } = useParams<{ laptopId: string }>();
  const [cartAdded, setCartAdded] = useState<string[]>([]);
  useEffect(() => {
    if (!laptopId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    itemService
      .getItem(laptopId)
      .then((data) => setItem(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [laptopId]);

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#2563eb" }} />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#8892a4", fontSize: 16 }}>
        Product not found.
      </Box>
    );
  }

  const specs = [
    { label: "Processor", value: item.laptopCpu },
    { label: "RAM", value: item.laptopRam },
    { label: "Storage", value: item.laptopStorage },
    { label: "Display", value: `${item.laptopDisplaySize}"` },
    { label: "GPU", value: item.laptopGpu ?? "Integrated" },
    { label: "Category", value: item.laptopCategory },
  ];

  const inStock = item.laptopStatus === LaptopStatus.PROCESS && item.laptopLeftCount > 0;
  const images = item.laptopImages.length > 0
    ? item.laptopImages
    : ["https://via.placeholder.com/600x400?text=No+Image"];

  const addToCart = (e: React.MouseEvent, laptop: Item) => {
    e.stopPropagation();

    handleAddToCart(laptop as unknown as CartItem);

    setCartAdded((prev) =>
      prev.includes(laptop._id) ? prev : [...prev, laptop._id]
    );
  };
  
  return (
    <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh", pb: 10 }}>

      <Box sx={{
        textAlign: "center",
        fontSize: 24,
        fontWeight: 700,
        color: "#e8eaf0",
        pt: 5,
        pb: 2,
        letterSpacing: "-0.3px",
      }}>
        Product Detail
      </Box>

      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ mb: 8 }}>

          {/* ── Slider ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              bgcolor: "#1a1a2e",
              overflow: "hidden",
              "& .swiper-button-next, & .swiper-button-prev": {
                color: "#3b82f6",
                "&::after": { fontSize: "18px" },
              },
            }}>
              <Swiper
                loop={false}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation]}
                onSwiper={(s) => (mainSwiperRef.current = s)}
                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <Box
                      component="img"
                      src={`${serverApi}/${src}`}
                      alt={`${item.laptopName}-${i}`}
                      sx={{
                        width: "100%",
                        height: { xs: 240, md: 360 },
                        objectFit: "contain",
                        p: 2,
                        bgcolor: "#1a1a2e",
                        display: "block",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            {/* Thumbnails */}
            <Box sx={{ mt: 1.5 }}>
              <Swiper
                spaceBetween={8}
                slidesPerView={3}
                freeMode={true}
                modules={[FreeMode]}
              >
                {images.map((src, i) => (
                  <SwiperSlide key={i} onClick={() => {
                    mainSwiperRef.current?.slideTo(i);
                    setActiveIndex(i);
                  }}>
                    <Box
                      component="img"
                      src={`${serverApi}/${src}`}
                      alt={`thumb-${i}`}
                      sx={{
                        width: "100%",
                        height: 80,
                        objectFit: "contain",
                        bgcolor: "#1a1a2e",
                        p: 1,
                        display: "block",
                        borderRadius: "10px",
                        cursor: "pointer",
                        opacity: activeIndex === i ? 1 : 0.5,
                        border: activeIndex === i
                          ? "1px solid #2563eb"
                          : "1px solid rgba(255,255,255,0.08)",
                        transition: "opacity 0.2s, border-color 0.2s",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>

          {/* ── Info Panel ── */}
          <Box sx={{
            flex: 1,
            minWidth: 0,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            p: { xs: 2.5, md: 3.5 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            {/* Chips */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label={item.laptopBrand} size="small" sx={{ bgcolor: "rgba(37,99,235,0.15)", color: "#3b82f6", border: "1px solid rgba(37,99,235,0.3)", fontSize: 11 }} />
              <Chip label={item.laptopCondition} size="small" sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "#8892a4", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11 }} />
              <Chip
                label={inStock ? "In Stock" : "Out of Stock"}
                size="small"
                icon={<Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: inStock ? "#4ade80" : "#f87171", ml: "8px !important" }} />}
                sx={{
                  bgcolor: inStock ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
                  color: inStock ? "#4ade80" : "#f87171",
                  border: `1px solid ${inStock ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
                  fontSize: 11,
                }}
              />
            </Box>

            {/* SKU */}
            <Box sx={{ fontSize: 11, color: "#8892a4", fontFamily: "monospace" }}>
              SKU: {item.laptopBrand.slice(0, 3).toUpperCase()}-{item.laptopCategory.slice(0, 3).toUpperCase()} — ID: {item._id}
            </Box>

            {/* Name */}
            <Box sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700, color: "#e8eaf0", lineHeight: 1.2, letterSpacing: "-0.4px" }}>
              {item.laptopName}
            </Box>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Rating defaultValue={4.2} precision={0.5} readOnly sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 13, color: "#8892a4" }}>
                <RemoveRedEyeIcon sx={{ fontSize: 16 }} />
                <span>{item.laptopViews}</span>
              </Box>
            </Box>

            {/* Specs */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              {specs.map((s) => (
                <Box key={s.label} sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  p: "10px 12px",
                }}>
                  <Box sx={{ fontSize: 10, color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.8px", mb: 0.5 }}>
                    {s.label}
                  </Box>
                  <Box sx={{ fontSize: 13, fontWeight: 500, color: "#e8eaf0" }}>
                    {s.value}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Description */}
            {item.laptopDesc && (
              <Box sx={{ fontSize: 14, color: "#8892a4", lineHeight: 1.7 }}>
                {item.laptopDesc}
              </Box>
            )}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
              <Box sx={{ fontFamily: "monospace", fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: "#e8eaf0" }}>
                ${item.laptopPrice.toLocaleString()}
              </Box>
              {item.laptopLeftCount <= 5 && item.laptopLeftCount > 0 && (
                <Box sx={{ fontSize: 12, color: "#f59e0b" }}>
                  Only {item.laptopLeftCount} left
                </Box>
              )}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="contained"
                disabled={!inStock || cartAdded.includes(item._id)}
                startIcon={<ShoppingBasketIcon />}
                onClick={(e) => { if (inStock) addToCart(e, item); }}
                sx={{
                  flex: 1,
                  bgcolor: cartAdded.includes(item._id) ? "#10b981" : "#2563eb",
                  borderRadius: "10px", py: 1.5,
                  fontWeight: 600, textTransform: "none", fontSize: 14,
                  "&:hover": { bgcolor: cartAdded.includes(item._id) ? "#059669" : "#1d4ed8" },
                  "&.Mui-disabled": { bgcolor: "rgba(37,99,235,0.3)", color: "#8892a4" },
                }}
              >
              {cartAdded.includes(item._id) ? "Added to Basket" : "Add to Basket"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 48, borderRadius: "10px",
                  borderColor: "rgba(255,255,255,0.1)", color: "#8892a4",
                  "&:hover": { borderColor: "rgba(239,68,68,0.5)", color: "#f87171", bgcolor: "transparent" },
                }}
              >
                <FavoriteBorderIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Stack>

        {/* ══ Reviews ══ */}
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", pt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ fontSize: 20, fontWeight: 600, color: "#e8eaf0" }}>Customer Reviews</Box>
            <Box sx={{ fontSize: 13, color: "#8892a4" }}>128 verified purchases</Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", p: 3, mb: 3, flexWrap: "wrap" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ fontFamily: "monospace", fontSize: 52, fontWeight: 700, color: "#e8eaf0", lineHeight: 1 }}>4.2</Box>
              <Rating value={4.2} precision={0.5} readOnly size="small" sx={{ mt: 1, "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
              <Box sx={{ fontSize: 12, color: "#8892a4", mt: 0.5 }}>out of 5</Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center" }}>
              {ratingBars.map((bar) => (
                <Box key={bar.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ fontSize: 12, color: "#8892a4", minWidth: 12 }}>{bar.label}</Box>
                  <Box sx={{ flex: 1, height: 6, bgcolor: "rgba(255,255,255,0.07)", borderRadius: "3px", overflow: "hidden" }}>
                    <Box sx={{ width: `${bar.pct}%`, height: "100%", bgcolor: "#2563eb", borderRadius: "3px" }} />
                  </Box>
                  <Box sx={{ fontSize: 12, color: "#8892a4", minWidth: 28 }}>{bar.pct}%</Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Stack spacing={2}>
            {reviews.map((r) => (
              <Box key={r.id} sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5, gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{
                      width: 38, height: 38, borderRadius: "50%",
                      bgcolor: `${r.color}22`, border: `1px solid ${r.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 600, color: r.color, flexShrink: 0,
                    }}>
                      {r.initials}
                    </Box>
                    <Box>
                      <Box sx={{ fontSize: 14, fontWeight: 500, color: "#e8eaf0" }}>{r.name}</Box>
                      <Box sx={{ fontSize: 12, color: "#8892a4" }}>{r.date}</Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <VerifiedUserIcon sx={{ fontSize: 13, color: "#2563eb" }} />
                    <Rating value={r.rating} readOnly size="small" sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
                  </Box>
                </Box>
                <Box sx={{ fontSize: 14, color: "#b0b8cc", lineHeight: 1.65, mb: 1.5 }}>{r.text}</Box>
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                  {r.tags.map((tag) => (
                    <Box key={tag} sx={{ fontSize: 11, color: "#8892a4", bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "5px", px: 1, py: 0.4 }}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}