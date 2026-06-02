import { Typography } from "@mui/material";
import type { Order, OrderItem } from "../../../lib/types/orders";
import type { Item } from "../../../lib/types/item";
import { serverApi } from "../../../lib/config";

const fmt = (n: number) => `$${n.toLocaleString()}`;

interface OrderCardProps {
  order: Order;
  actions: React.ReactNode;
}

export default function OrderCard({ order, actions }: OrderCardProps) {
  return (
    <div className="app-shell-card order-card">
      <div className="order-card__head">
        <Typography className="order-card__id">#{order._id.slice(-8).toUpperCase()}</Typography>
        <Typography className="order-card__count">
          {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
        </Typography>
      </div>

      <div className="order-card__items">
        {order.orderItems.map((item: OrderItem) => {
          const laptop = order.itemData?.find((entry: Item) => entry._id === item.itemId);
          const imagePath = laptop?.laptopImages?.[0]
            ? `${serverApi}/${laptop.laptopImages[0]}`
            : null;

          return (
            <div key={item._id} className="order-card__item">
              <div className="order-card__item-left">
                <div className="order-card__item-image-shell">
                  {imagePath ? (
                    <img src={imagePath} alt={laptop?.laptopName} className="order-card__item-image" />
                  ) : (
                    <Typography className="order-card__item-fallback">💻</Typography>
                  )}
                </div>
                <div>
                  <Typography className="order-card__item-name">
                    {laptop?.laptopName ?? "Unknown Laptop"}
                  </Typography>
                  <Typography className="order-card__item-meta">
                    {fmt(item.itemPrice)} × {item.itemQuantity}
                  </Typography>
                </div>
              </div>
              <Typography className="order-card__item-total">
                {fmt(item.itemPrice * item.itemQuantity)}
              </Typography>
            </div>
          );
        })}
      </div>

      <div className="app-shell-divider" />

      <div className="order-card__footer">
        <div className="order-card__summary">
          {[
            { label: "Products", value: fmt(order.orderTotal - order.orderDelivery) },
            { label: "Delivery", value: fmt(order.orderDelivery), sep: "+" },
            { label: "Total", value: fmt(order.orderTotal), sep: "=", highlight: true },
          ].map((part, index) => (
            <div key={index} className="order-card__summary-group">
              {part.sep && <Typography className="order-card__summary-sep">{part.sep}</Typography>}
              <div className="order-card__summary-entry">
                <Typography className="order-card__summary-label">{part.label}</Typography>
                <Typography
                  className={`order-card__summary-value${part.highlight ? " is-highlight" : ""}`}
                >
                  {part.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <div className="order-card__actions">{actions}</div>
      </div>
    </div>
  );
}
