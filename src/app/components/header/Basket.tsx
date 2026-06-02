import React from "react";
import { Box, Button, Typography, IconButton, Drawer } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/cart";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../hooks/useGlobals";

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
  const { authMember, setOrderBuilder } = useGlobals();

  const totalPrice = (cartItems ?? []).reduce(
    (a, c) => a + (c.laptopPrice ?? 0) * (c.quantity ?? 1),
    0
  );

  const proceedOrderHandler = async () => {
    try {
      if (!authMember) {
        toast.error("Please login first.");
        return;
      }
      const orderService = new OrderService();
      await orderService.createOrder(cartItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      setOpen(false);
      navigate("/orders");
      toast.success("Order placed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="small" className="basket-trigger">
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartOutlinedIcon className="basket-trigger__icon" />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: "basket-drawer" }}
      >
        <div className="basket-drawer__header">
          <div className="basket-drawer__header-main">
            <ShoppingCartIcon className="basket-drawer__header-icon" />
            <Typography className="basket-drawer__header-title">Your Cart</Typography>
            {cartItems.length > 0 && (
              <div className="basket-drawer__count">{cartItems.length} items</div>
            )}
          </div>

          <div className="basket-drawer__header-actions">
            {cartItems.length > 0 && (
              <IconButton onClick={onDeleteAll} size="small" className="basket-drawer__clear">
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton onClick={() => setOpen(false)} size="small" className="basket-drawer__close">
              <CancelIcon />
            </IconButton>
          </div>
        </div>

        <div className="basket-drawer__body">
          {cartItems.length === 0 ? (
            <div className="basket-drawer__empty">
              <ShoppingCartIcon className="basket-drawer__empty-icon" />
              <Typography className="basket-drawer__empty-text">Your cart is empty</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setOpen(false);
                  navigate("/laptops");
                }}
                className="basket-drawer__browse"
              >
                Browse Laptops
              </Button>
            </div>
          ) : (
            <div className="basket-drawer__stack">
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.laptopImages?.[0]}`;

                return (
                  <div key={item._id} className="basket-drawer__item">
                    <Box
                      component="img"
                      src={imagePath}
                      alt={item.laptopName}
                      className="basket-drawer__image"
                    />

                    <div className="basket-drawer__item-copy">
                      <Typography className="basket-drawer__item-name">{item.laptopName}</Typography>
                      <Typography className="basket-drawer__item-total">
                        ${((item.laptopPrice ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                      </Typography>

                      <div className="basket-drawer__qty">
                        <IconButton
                          size="small"
                          onClick={() => onRemove(item)}
                          className="basket-drawer__qty-button basket-drawer__qty-button--ghost"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography className="basket-drawer__qty-value">{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onAdd(item)}
                          className="basket-drawer__qty-button basket-drawer__qty-button--primary"
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography className="basket-drawer__qty-price">
                          × ${item.laptopPrice.toLocaleString()}
                        </Typography>
                      </div>
                    </div>

                    <IconButton
                      size="small"
                      onClick={() => onDelete(item)}
                      className="basket-drawer__remove"
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="basket-drawer__footer">
            <div className="basket-drawer__total">
              <Typography className="basket-drawer__total-label">Total</Typography>
              <Typography className="basket-drawer__total-value">
                ${totalPrice.toLocaleString()}
              </Typography>
            </div>
            <Button
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={proceedOrderHandler}
              className="basket-drawer__checkout"
            >
              Checkout
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
}
