import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../../lib/types/orders";

interface OrderState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

const initialState: OrderState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPausedOrders(state, action: PayloadAction<Order[]>) {
      state.pausedOrders = action.payload;
    },
    setProcessOrders(state, action: PayloadAction<Order[]>) {
      state.processOrders = action.payload;
    },
    setFinishedOrders(state, action: PayloadAction<Order[]>) {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } = orderSlice.actions;
const OrdersPageReducer = orderSlice.reducer;
export default OrdersPageReducer;