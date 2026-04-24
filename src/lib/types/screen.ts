import type { Member } from "./member";
import type { Item } from "./item";

export interface AppRootState {
    homePage: HomePageState;
    itemsPage: ItemsPageState;
}

export interface HomePageState {
    topLaptops: Item[];
    newLaptops: Item[];
    topUsers: Member[];
}

export interface ItemsPageState {
    laptops: Item[];
}