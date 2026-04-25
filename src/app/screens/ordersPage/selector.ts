// src/app/selectors/orderSelector.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const selectOrderState = (state: RootState) => state.order;

export const retrievePausedOrders = createSelector(
  selectOrderState,
  (order) => order.pausedOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrderState,
  (order) => order.processOrders
);

export const retrieveFinishedOrders = createSelector(
  selectOrderState,
  (order) => order.finishedOrders
);