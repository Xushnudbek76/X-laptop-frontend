import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { Item } from "../../../lib/types/item";

interface ItemsPageState {
  laptops: Item[];
}

const initialState: ItemsPageState = {
  laptops: [],
};

const itemsPageSlice = createSlice({
  name: "itemsPage",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Item[]>) {
      state.laptops = action.payload;
    },
  },
});

export const { setProducts } = itemsPageSlice.actions;
const ItemsPageReducer = itemsPageSlice.reducer;
export default ItemsPageReducer;