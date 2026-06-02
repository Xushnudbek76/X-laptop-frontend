import { Chip, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import OrderCard from "./OrderCard";
import { retrieveFinishedOrders } from "./selector";
import type { Order } from "../../../lib/types/orders";

const finishedOrdersRetriever = createSelector(retrieveFinishedOrders, (finishedOrders) => ({
  finishedOrders,
}));

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3" className="orders-page__panel">
      {finishedOrders.map((order: Order) => (
        <OrderCard
          key={order._id}
          order={order}
          actions={
            <div className="orders-page__completed">
              <Typography className="orders-page__completed-date">
                {new Date(order.updatedAt).toLocaleDateString()}
              </Typography>
              <Chip
                label="Completed"
                size="small"
                icon={<CheckCircleOutlineIcon />}
                className="orders-page__completed-chip"
              />
            </div>
          }
        />
      ))}

      {finishedOrders.length === 0 && (
        <div className="app-empty-state">
          <CheckCircleOutlineIcon className="app-empty-state__icon" />
          <Typography className="app-empty-state__text">No finished orders yet</Typography>
        </div>
      )}
    </TabPanel>
  );
}
