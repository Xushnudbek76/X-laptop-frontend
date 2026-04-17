import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  topLaptops: [],
  newLaptops: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopLaptops: (state, action) => {
      state.topLaptops = action.payload;
    },
    setNewLaptops: (state, action) => {
      state.newLaptops = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setTopLaptops, setNewLaptops, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
