import { Box, Typography } from "@mui/material";
import type { Order, OrderItem } from "../../../lib/types/orders";
import type { Item } from "../../../lib/types/item";
import { serverApi } from "../../../lib/config";

const fmt = (n: number) => `$${n.toLocaleString()}`;

const cardSx = {
  bgcolor: "#1a1a2e",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  mb: 2,
  overflow: "hidden",
  transition: "border-color 0.2s",
  "&:hover": { borderColor: "rgba(37,99,235,0.35)" },
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
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#2563eb",
            letterSpacing: "0.4px",
            fontFamily: "monospace",
          }}
        >
          #{order._id.slice(-8).toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#8892a4" }}>
          {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Items */}
      <Box sx={{ px: 2.5, pb: 1.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {order.orderItems.map((item: OrderItem) => {
          const laptop = order.itemData?.find((d: Item) => d._id === item.itemId);
          const imagePath = laptop?.laptopImages?.[0]
            ? `${serverApi}/${laptop.laptopImages[0]}`
            : null;

          return (
            <Box
              key={item._id}
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "10px",
                    bgcolor: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.2)",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {imagePath ? (
                    <Box
                      component="img"
                      src={imagePath}
                      alt={laptop?.laptopName}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: 20 }}>💻</Typography>
                  )}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0" }}>
                    {laptop?.laptopName ?? "Unknown Laptop"}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#8892a4", mt: 0.2 }}>
                    {fmt(item.itemPrice)} × {item.itemQuantity}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0" }}>
                {fmt(item.itemPrice * item.itemQuantity)}
              </Typography>
            </Box>
          );
        })}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          {[
            { label: "Products", value: fmt(order.orderTotal - order.orderDelivery) },
            { label: "Delivery", value: fmt(order.orderDelivery), sep: "+" },
            { label: "Total", value: fmt(order.orderTotal), sep: "=", highlight: true },
          ].map((p, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              {p.sep && (
                <Typography sx={{ color: "rgba(255,255,255,0.2)", fontSize: 16 }}>
                  {p.sep}
                </Typography>
              )}
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 11, color: "#8892a4", mb: 0.3 }}>{p.label}</Typography>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{actions}</Box>
      </Box>
    </Box>
  );
}
