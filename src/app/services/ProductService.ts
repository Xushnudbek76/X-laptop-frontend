import { serverApi } from "../../lib/config";
import type { Item, ProductInquiry } from "../../lib/types/item";
import axios from "axios";

class ItemService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getItems(input: ProductInquiry): Promise<Item[]> {
    try {
      let url = `${this.path}/item/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.laptopCategory) url += `&laptopCategory=${input.laptopCategory}`;
      if (input.laptopRam !== undefined) url += `&laptopRam=${input.laptopRam}`;
      if (input.laptopStorage !== undefined) url += `&laptopStorage=${input.laptopStorage}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log("Error, getItems", error);
      throw error;
    }
  }

  public async getItem(id: string): Promise<Item> {
    try {
      const result = await axios.get(`${this.path}/item/${id}`, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("Error, getItem", error);
      throw error;
    }
  }
}

export default ItemService;
