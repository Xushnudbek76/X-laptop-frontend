import { Box, Container, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface Laptop {
  image: string;
  name: string;
  brand: string;
  views: number;
  rating: number;
  description: string;
  price: number;
}

const laptops: Laptop[] = [
  {
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    name: "ProBook X1",
    brand: "HP",
    views: 134,
    rating: 4.8,
    description: "Ultra-slim business laptop with 16hr battery",
    price: 1299,
  },
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    name: "MacBook Pro 14",
    brand: "Apple",
    views: 298,
    rating: 4.9,
    description: "M3 chip, Liquid Retina XDR display, all-day",
    price: 1999,
  },
  {
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop",
    name: "XPS 15",
    brand: "Dell",
    views: 201,
    rating: 4.7,
    description: "4K OLED touch display, Intel Core i9, RTX",
    price: 1799,
  },
  {
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600&h=400&fit=crop",
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    views: 140,
    rating: 4.6,
    description: "Lightweight carbon fiber build, vPro security",
    price: 1499,
  },
];

function LaptopCard({ image, name, brand, views, rating, description, price }: Laptop) {
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
      {/* Image */}
      <Box sx={{ position: "relative", height: 260, overflow: "hidden" }}>
        <Box
          component="img"
          src={image}
          alt={name}
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

        {/* Brand badge */}
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
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: 1,
            px: 1,
            py: 0.4,
            lineHeight: 1.6,
          }}
        >
          {brand}
        </Box>

        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            color: "#fbbf24",
            fontWeight: 700,
            fontSize: 11,
            borderRadius: 1,
            px: 1,
            py: 0.25,
            lineHeight: 1.6,
            display: "flex",
            alignItems: "center",
            gap: 0.4,
          }}
        >
          <StarIcon sx={{ fontSize: 11, color: "#fbbf24" }} />
          {rating}
        </Box>

        {/* Name + Views */}
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
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
            {name}
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
              {views}
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
        {/* Left: dot + description */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "#2563eb",
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#e2e8f0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "#475569",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        {/* Right: price + cart button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#3b82f6" }}>
            ${price.toLocaleString()}
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#2563eb",
              color: "#fff",
              width: 34,
              height: 34,
              borderRadius: 2,
              "&:hover": { bgcolor: "#1d4ed8" },
              transition: "background 0.2s ease",
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function MostSelled() {
  return (
    <Box sx={{ bgcolor: "#f5f6f8", py: 10 }}>
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
            Top Picks
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 28, md: 36 },
              fontWeight: 900,
              color: "#0a0a0f",
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            Most Sold Laptops
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {laptops.map((laptop, i) => (
            <Box
              key={i}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(25% - 18px)",
                },
              }}
            >
              <LaptopCard {...laptop} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}