import { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { toast } from "sonner";
import OrderCard from "./OrderCard";
import { retrievePausedOrders } from "./selector";
import { useGlobals } from "../../components/hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import type { Order, OrderUpdateInput } from "../../../lib/types/orders";

const pausedOrdersRetriever = createSelector(retrievePausedOrders, (pausedOrders) => ({
  pausedOrders,
}));

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders({ setValue }: PausedOrdersProps) {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    orderId: string;
    type: "cancel" | "pay";
  }>({ open: false, orderId: "", type: "pay" });

  const deleteOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) {
        toast.error("Please login first.");
        return;
      }
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.DELETE };
      await new OrderService().updateOrder(input);
      setOrderBuilder(new Date());
      toast.success("Order cancelled.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel order.");
    }
  };

  const processOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) {
        toast.error("Please login first.");
        return;
      }
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.PROCESS };
      await new OrderService().updateOrder(input);
      setValue("2");
      setOrderBuilder(new Date());
      toast.success("Order is now processing.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to process order.");
    }
  };

  const handleConfirm = async () => {
    setConfirmDialog((prev) => ({ ...prev, open: false }));
    if (confirmDialog.type === "cancel") {
      await deleteOrderHandler(confirmDialog.orderId);
    } else {
      await processOrderHandler(confirmDialog.orderId);
    }
  };

  return (
    <TabPanel value="1" className="orders-page__panel">
      {pausedOrders.map((order: Order) => (
        <OrderCard
          key={order._id}
          order={order}
          actions={
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setConfirmDialog({ open: true, orderId: order._id, type: "cancel" })}
                className="orders-page__action orders-page__action--ghost"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => setConfirmDialog({ open: true, orderId: order._id, type: "pay" })}
                className="orders-page__action orders-page__action--primary"
              >
                Pay Now
              </Button>
            </>
          }
        />
      ))}

      {pausedOrders.length === 0 && (
        <div className="app-empty-state">
          <PauseCircleOutlineIcon className="app-empty-state__icon" />
          <Typography className="app-empty-state__text">No paused orders</Typography>
        </div>
      )}

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
        PaperProps={{ className: "app-dialog-paper" }}
      >
        <DialogTitle className="app-dialog-title">
          {confirmDialog.type === "pay" ? "💳 Confirm Payment" : "🗑️ Cancel Order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="app-dialog-text">
            {confirmDialog.type === "pay"
              ? "Are you sure you want to proceed with payment? This will move your order to processing."
              : "Are you sure you want to cancel this order? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="app-dialog-actions">
          <Button
            onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
            className="app-dialog-button app-dialog-button--ghost"
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            className={`app-dialog-button ${
              confirmDialog.type === "pay"
                ? "app-dialog-button--primary"
                : "app-dialog-button--danger"
            }`}
          >
            {confirmDialog.type === "pay" ? "Yes, Pay Now" : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
