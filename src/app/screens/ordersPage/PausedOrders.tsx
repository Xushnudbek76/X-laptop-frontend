import { useState } from "react";
import {
  Box,
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
    <TabPanel value="1" sx={{ p: 0 }}>
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
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#8892a4",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => setConfirmDialog({ open: true, orderId: order._id, type: "pay" })}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                  boxShadow: "none",
                }}
              >
                Pay Now
              </Button>
            </>
          }
        />
      ))}

      {pausedOrders.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
          }}
        >
          <PauseCircleOutlineIcon sx={{ fontSize: 40, color: "#8892a4", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#8892a4" }}>No paused orders</Typography>
        </Box>
      )}

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
        PaperProps={{
          sx: {
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            minWidth: 340,
          },
        }}
      >
        <DialogTitle sx={{ color: "#e8eaf0", fontWeight: 700, fontSize: 17 }}>
          {confirmDialog.type === "pay" ? "💳 Confirm Payment" : "🗑️ Cancel Order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#8892a4", fontSize: 14 }}>
            {confirmDialog.type === "pay"
              ? "Are you sure you want to proceed with payment? This will move your order to processing."
              : "Are you sure you want to cancel this order? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              color: "#8892a4",
              border: "1px solid rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              bgcolor: confirmDialog.type === "pay" ? "#2563eb" : "#ef4444",
              "&:hover": { bgcolor: confirmDialog.type === "pay" ? "#1d4ed8" : "#dc2626" },
              boxShadow: "none",
            }}
          >
            {confirmDialog.type === "pay" ? "Yes, Pay Now" : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
