import axios from "axios";
import { serverApi } from "../../lib/config";
import type { CartItem } from "../../lib/types/cart";
import type { OrderItemInput, OrderInquiry, OrderUpdateInput, Order } from "../../lib/types/orders";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.laptopPrice,
          itemId: cartItem._id,
        };
      });

      const url = `${this.path}/order/create`;
      const result = await axios.post(url, orderItems, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      console.log("Error, createOrder:", error);
      throw error;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const url = `${this.path}/order/all`;
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

      const result = await axios.get(url + query, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error, getMyOrders", error);
      throw error;
    }
  }
  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    try {
      const url = `${this.path}/order/update`;
      const result = await axios.post(url, input, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error. updateOrder", error);
      throw error;
    }
  }
}

export default OrderService;
