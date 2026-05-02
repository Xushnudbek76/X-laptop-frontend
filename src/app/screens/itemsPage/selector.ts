import type { AppRootState } from "../../../lib/types/screen";

export const retrieveProducts = (state: AppRootState) => state.itemsPage.laptops;
