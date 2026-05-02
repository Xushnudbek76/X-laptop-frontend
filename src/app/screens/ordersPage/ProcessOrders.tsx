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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { toast } from "sonner";
import OrderCard from "./OrderCard";
import { retrieveProcessOrders } from "./selector";
import { useGlobals } from "../../components/hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import type { Order, OrderUpdateInput } from "../../../lib/types/orders";

const processOrdersRetriever = createSelector(retrieveProcessOrders, (processOrders) => ({
  processOrders,
}));

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders({ setValue }: ProcessOrdersProps) {
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });

  const finishOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) {
        toast.error("Please login first.");
        return;
      }
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.FINISH };
      await new OrderService().updateOrder(input);
      setValue("3");
      setOrderBuilder(new Date());
      toast.success("Order completed!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to complete order.");
    }
  };

  const handleConfirm = async () => {
    setConfirmDialog((prev) => ({ ...prev, open: false }));
    await finishOrderHandler(confirmDialog.orderId);
  };

  return (
    <TabPanel value="2" sx={{ p: 0 }}>
      {processOrders.map((order: Order) => (
        <OrderCard
          key={order._id}
          order={order}
          actions={
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 13, color: "#8892a4" }} />
                <Typography sx={{ fontSize: 12, color: "#8892a4" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => setConfirmDialog({ open: true, orderId: order._id })}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: "#0ea5e9",
                  "&:hover": { bgcolor: "#0284c7" },
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Verify & Fulfil
              </Button>
            </>
          }
        />
      ))}

      {processOrders.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 40, color: "#8892a4", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#8892a4" }}>No orders in process</Typography>
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
          ✅ Verify & Fulfil Order
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#8892a4", fontSize: 14 }}>
            Confirm that you have received your order and want to mark it as finished?
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
              bgcolor: "#0ea5e9",
              "&:hover": { bgcolor: "#0284c7" },
              boxShadow: "none",
            }}
          >
            Yes, Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
