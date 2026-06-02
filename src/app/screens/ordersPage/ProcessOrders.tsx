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
    <TabPanel value="2" className="orders-page__panel">
      {processOrders.map((order: Order) => (
        <OrderCard
          key={order._id}
          order={order}
          actions={
            <>
              <div className="orders-page__date">
                <AccessTimeIcon className="orders-page__date-icon" />
                <Typography>{new Date(order.createdAt).toLocaleDateString()}</Typography>
              </div>
              <Button
                variant="contained"
                size="small"
                onClick={() => setConfirmDialog({ open: true, orderId: order._id })}
                className="orders-page__action orders-page__action--info"
              >
                Verify & Fulfil
              </Button>
            </>
          }
        />
      ))}

      {processOrders.length === 0 && (
        <div className="app-empty-state">
          <AccessTimeIcon className="app-empty-state__icon" />
          <Typography className="app-empty-state__text">No orders in process</Typography>
        </div>
      )}

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
        PaperProps={{ className: "app-dialog-paper" }}
      >
        <DialogTitle className="app-dialog-title">✅ Verify & Fulfil Order</DialogTitle>
        <DialogContent>
          <DialogContentText className="app-dialog-text">
            Confirm that you have received your order and want to mark it as finished?
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
            className="app-dialog-button app-dialog-button--primary"
          >
            Yes, Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
