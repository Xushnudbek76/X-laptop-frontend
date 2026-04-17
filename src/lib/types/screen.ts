import type { Member } from "./member";
import type { Item } from "./item";

export interface AppRootState {
    homePage: HomePageState;
}

export interface HomePageState {
    topLaptops: Item[];
    newLaptops: Item[];
    topUsers: Member[];
}