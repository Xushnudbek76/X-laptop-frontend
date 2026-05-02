import type { Member } from "./member";
import type { Item } from "./item";
import type { Order } from "./orders";

export interface AppRootState {
  homePage: HomePageState;
  itemsPage: ItemsPageState;
  ordersPage: OrdersPageState;
}

export interface HomePageState {
  topLaptops: Item[];
  newLaptops: Item[];
  topUsers: Member[];
}

export interface ItemsPageState {
  laptops: Item[];
}

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  completedOrders: Order[];
}
