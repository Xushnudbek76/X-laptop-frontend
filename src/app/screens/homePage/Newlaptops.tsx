import { Box, Container, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BoltIcon from "@mui/icons-material/Bolt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveNewLaptops } from "./selector";
import { useSelector } from "react-redux";
import type { Item } from "../../../lib/types/item";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/cart";

const NewLaptopsRetriever = createSelector(
  retrieveNewLaptops,
  (newLaptops) => ({ newLaptops })
);
interface NewLaptopCardProps {
  laptop: Item;
  handleAddToCart: (item: CartItem) => void;
}
function NewLaptopCard({ laptop, handleAddToCart }: NewLaptopCardProps) {
  const image = `${serverApi}/${laptop.laptopImages[0]}`;

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#13151f",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
        },
        "&:hover img": { transform: "scale(1.05)" },
      }}
    >
      <Box sx={{ position: "relative", height: 260, overflow: "hidden" }}>
        <Box
          component="img"
          src={image}
          alt={laptop.laptopName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.2) 50%, transparent 100%)",
          }}
        />

        {/* Category badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(37,99,235,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#60a5fa",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.08em",
            borderRadius: 1,
            px: 1,
            py: 0.35,
            lineHeight: 1.6,
          }}
        >
          {laptop.laptopCategory}
        </Box>

        {/* Condition badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: laptop.laptopCondition === "NEW" ? "#16a34a" : "#d97706",
            color: "#fff",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.08em",
            borderRadius: 1,
            px: 1,
            py: 0.35,
            lineHeight: 1.6,
          }}
        >
          {laptop.laptopCondition}
        </Box>

        {/* Price + views */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 14,
            right: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: "#3b82f6" }}>
            ${laptop.laptopPrice.toLocaleString()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              bgcolor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
              borderRadius: "20px",
              px: 1,
              py: 0.3,
            }}
          >
            <Typography sx={{ color: "#94a3b8", fontSize: 11, fontWeight: 600 }}>
              {laptop.laptopViews}
            </Typography>
            <VisibilityIcon sx={{ color: "#64748b", fontSize: 13 }} />
          </Box>
        </Box>
      </Box>

      {/* Bottom strip */}
      <Box
        sx={{
          px: 2,
          py: 1.75,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          bgcolor: "#13151f",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "#e2e8f0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {laptop.laptopName}
            </Typography>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: "#3b82f6",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              {laptop.laptopBrand}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BoltIcon sx={{ fontSize: 12, color: "#2563eb" }} />
            <Typography sx={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>
              {laptop.laptopCpu} · {laptop.laptopRam} GB · {laptop.laptopStorage} GB
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => handleAddToCart({ ...laptop, quantity: 1 })}
          size="small"
          sx={{
            bgcolor: "#2563eb",
            color: "#fff",
            width: 34,
            height: 34,
            borderRadius: 2,
            flexShrink: 0,
            "&:hover": { bgcolor: "#1d4ed8" },
            transition: "background 0.2s ease",
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
interface NewLaptopsProps {
  handleAddToCart: (item: CartItem) => void;
}
export default function NewLaptops(props: NewLaptopsProps) {
  const { newLaptops } = useSelector(NewLaptopsRetriever);
  const { handleAddToCart } = props;

  return (
    <Box sx={{ bgcolor: "#0f1117", py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 3,
              color: "#2563eb",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Just Arrived
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 28, md: 36 },
              fontWeight: 900,
              color: "#f8fafc",
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            New Laptops
          </Typography>
        </Box>

        {newLaptops.length !== 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {newLaptops.map((laptop: Item) => (
              <Box
                key={laptop._id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(25% - 18px)",
                  },
                }}
              >
                <NewLaptopCard laptop={laptop} handleAddToCart={handleAddToCart} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", color: "#475569", py: 6 }}>
            No new laptops available
          </Box>
        )}
      </Container>
    </Box>
  );
}