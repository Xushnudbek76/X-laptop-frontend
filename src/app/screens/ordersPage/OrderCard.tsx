import { Box, Typography } from "@mui/material";
import type { Order } from "./data";

const fmt = (n: number) => `₩${n.toLocaleString()}`;

const cardSx = {
  bgcolor: "#1a1a2e",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  mb: 2,
  overflow: "hidden",
  transition: "border-color 0.2s",
  "&:hover": {
    borderColor: "rgba(37,99,235,0.35)",
  },
};

interface OrderCardProps {
  order: Order;
  actions: React.ReactNode;
}

export default function OrderCard({ order, actions }: OrderCardProps) {
  return (
    <Box sx={cardSx}>
      {/* Order ID row */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#2563eb", letterSpacing: "0.4px" }}>
          {order.id}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#8892a4" }}>
          {order.items.length} item{order.items.length > 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Items */}
      <Box sx={{ px: 2.5, pb: 1.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {order.items.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  bgcolor: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                {item.img}
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#8892a4", mt: 0.2 }}>
                  {fmt(item.price)} × {item.qty}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0" }}>
              {fmt(item.price * item.qty)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.06)", mx: 2.5 }} />

      {/* Footer */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Pricing */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          {[
            { label: "Products", value: fmt(order.productPrice) },
            { label: "Delivery", value: fmt(order.delivery), sep: "+" },
            { label: "Total", value: fmt(order.total), sep: "=", highlight: true },
          ].map((p, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              {p.sep && (
                <Typography sx={{ color: "rgba(255,255,255,0.2)", fontSize: 16 }}>
                  {p.sep}
                </Typography>
              )}
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 11, color: "#8892a4", mb: 0.3 }}>
                  {p.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: p.highlight ? 14 : 13,
                    fontWeight: p.highlight ? 700 : 600,
                    color: p.highlight ? "#60a5fa" : "#e8eaf0",
                  }}
                >
                  {p.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {actions}
        </Box>
      </Box>
    </Box>
  );
}
