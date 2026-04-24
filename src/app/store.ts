import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ItemsPageReducer from "./screens/itemsPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    itemsPage: ItemsPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
