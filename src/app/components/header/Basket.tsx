import React from "react";
import { Box, Button, Stack, Typography, IconButton, Drawer} from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/cart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((a, c) => a + (c.laptopPrice ?? 0) * (c.quantity ?? 1), 0);
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="small"
        sx={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, p: 0.75 }}
      >
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18, color: "#94a3b8" }} />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 420 },
            bgcolor: "#0d1117",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box sx={{
          px: 3, py: 2.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ShoppingCartIcon sx={{ color: "#3b82f6", fontSize: 22 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>
              Your Cart
            </Typography>
            {cartItems.length > 0 && (
              <Box sx={{
                bgcolor: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
                color: "#60a5fa", fontSize: 11, fontWeight: 700,
                borderRadius: "20px", px: 1.2, py: 0.2,
              }}>
                {cartItems.length} items
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {cartItems.length > 0 && (
              <IconButton
                onClick={onDeleteAll}
                size="small"
                sx={{
                  color: "#f87171", bgcolor: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px",
                  "&:hover": { bgcolor: "rgba(239,68,68,0.15)" },
                }}
              >
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "#64748b", "&:hover": { color: "#fff" } }}
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2 }}>
          {cartItems.length === 0 ? (
            <Box sx={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: "100%", gap: 2, py: 8,
            }}>
              <ShoppingCartIcon sx={{ fontSize: 56, color: "rgba(255,255,255,0.08)" }} />
              <Typography sx={{ color: "#475569", fontSize: 15, fontWeight: 600 }}>
                Your cart is empty
              </Typography>
              <Button
                onClick={() => { setOpen(false); navigate("/laptops"); }}
                variant="outlined"
                size="small"
                sx={{
                  color: "#3b82f6", borderColor: "rgba(59,130,246,0.4)",
                  borderRadius: "10px", textTransform: "none", fontWeight: 600,
                  "&:hover": { borderColor: "#3b82f6", bgcolor: "rgba(59,130,246,0.08)" },
                }}
              >
                Browse Laptops
              </Button>
            </Box>
          ) : (
            <Stack gap={1.5}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.laptopImages?.[0]}`;
                return (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex", alignItems: "center", gap: 2,
                      bgcolor: "#161b27", borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      p: 1.5, position: "relative",
                      transition: "border-color 0.2s",
                      "&:hover": { borderColor: "rgba(59,130,246,0.25)" },
                    }}
                  >
                    {/* Image */}
                    <Box
                      component="img"
                      src={imagePath}
                      alt={item.laptopName}
                      sx={{
                        width: 64, height: 64, borderRadius: "10px",
                        objectFit: "cover", flexShrink: 0,
                        bgcolor: "#1e293b",
                      }}
                    />

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{
                        fontSize: 13, fontWeight: 700, color: "#e2e8f0",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        mb: 0.5,
                      }}>
                        {item.laptopName}
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 800, color: "#3b82f6", mb: 1 }}>
                        ${((item.laptopPrice ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                      </Typography>

                      {/* Qty controls */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => onRemove(item)}
                          sx={{
                            width: 26, height: 26, borderRadius: "7px",
                            bgcolor: "rgba(255,255,255,0.06)",
                            color: "#94a3b8",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "#fff" },
                          }}
                        >
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", minWidth: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => onAdd(item)}
                          sx={{
                            width: 26, height: 26, borderRadius: "7px",
                            bgcolor: "rgba(59,130,246,0.15)",
                            color: "#60a5fa",
                            "&:hover": { bgcolor: "rgba(59,130,246,0.25)", color: "#fff" },
                          }}
                        >
                          <AddIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: 11, color: "#475569", ml: 0.5 }}>
                          × ${item.laptopPrice.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Delete */}
                    <IconButton
                      size="small"
                      onClick={() => onDelete(item)}
                      sx={{
                        position: "absolute", top: 8, right: 8,
                        color: "#475569", width: 22, height: 22,
                        "&:hover": { color: "#f87171" },
                      }}
                    >
                      <CancelIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.07)", px: 3, py: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 900, color: "#f1f5f9" }}>
                ${totalPrice.toLocaleString()}
              </Typography>
            </Box>
            <Button
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={() => { setOpen(false); navigate("/orders"); }}
              sx={{
                bgcolor: "#2563eb", color: "#fff", fontWeight: 700,
                borderRadius: "12px", py: 1.4, textTransform: "none", fontSize: 15,
                "&:hover": { bgcolor: "#1d4ed8" },
                boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
              }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
}