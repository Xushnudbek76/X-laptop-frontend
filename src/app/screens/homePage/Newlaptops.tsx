import { Box, Container, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BoltIcon from "@mui/icons-material/Bolt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type LaptopSize = "THIN" | "GAMING" | "STANDARD" | null;

interface NewLaptop {
  image: string;
  name: string;
  brand: string;
  price: number;
  views: number;
  size: LaptopSize;
  isNew?: boolean;
  specs: string;
}

const newLaptops: NewLaptop[] = [
  {
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop",
    name: "ROG Zephyrus G16",
    brand: "ASUS",
    price: 2499,
    views: 44,
    size: "GAMING",
    isNew: true,
    specs: "Ryzen 9 / 32GB / RTX 4090",
  },
  {
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
    name: "Gram 17",
    brand: "LG",
    price: 1599,
    views: 21,
    size: "THIN",
    isNew: true,
    specs: "i7 / 16GB / Iris Xe",
  },
  {
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop",
    name: "Spectre x360",
    brand: "HP",
    price: 1899,
    views: 38,
    size: "STANDARD",
    isNew: false,
    specs: "i7 / 16GB / Iris Xe",
  },
  {
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop",
    name: "Swift X 14",
    brand: "Acer",
    price: 1099,
    views: 0,
    size: null,
    isNew: true,
    specs: "Ryzen 7 / 16GB / RTX 3050",
  },
];

const sizeColors: Record<string, string> = {
  GAMING: "#7c3aed",
  THIN: "#0891b2",
  STANDARD: "#2563eb",
};

function NewLaptopCard({ image, name, brand, price, views, size, isNew, specs }: NewLaptop) {
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

        {/* Size badge */}
        {size && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: sizeColors[size],
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
            {size}
          </Box>
        )}

        {/* NEW badge */}
        {isNew && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "#16a34a",
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
            NEW
          </Box>
        )}

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
            ${price.toLocaleString()}
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
        {/* Left: name + specs */}
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
              {name}
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
              {brand}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BoltIcon sx={{ fontSize: 12, color: "#2563eb" }} />
            <Typography sx={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>
              {specs}
            </Typography>
          </Box>
        </Box>

        {/* Right: cart button */}
        <IconButton
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

export default function NewLaptops() {
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

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {newLaptops.map((laptop, i) => (
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
              <NewLaptopCard {...laptop} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}