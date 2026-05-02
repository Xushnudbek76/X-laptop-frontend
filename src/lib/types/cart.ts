export interface CartItem {
  _id: string;
  quantity: number;
  laptopName: string;
  laptopPrice: number;
  laptopImages: string[];
  laptopBrand?: string;
  laptopCategory?: string;
  laptopStatus?: string;
}
