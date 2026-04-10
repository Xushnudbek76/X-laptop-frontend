export interface OrderItem {
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface Order {
  id: string;
  date?: string;
  items: OrderItem[];
  productPrice: number;
  delivery: number;
  total: number;
}

export const PAUSED_ORDERS: Order[] = [
  {
    id: "#XL-3821",
    items: [
      { name: 'MacBook Pro 14" M3', price: 2490000, qty: 1, img: "💻" },
      { name: "Apple Magic Mouse", price: 129000, qty: 2, img: "🖱️" },
    ],
    productPrice: 2748000,
    delivery: 5000,
    total: 2753000,
  },
  {
    id: "#XL-3819",
    items: [
      { name: "Sony WH-1000XM5", price: 390000, qty: 1, img: "🎧" },
      { name: "Anker USB-C Hub 7-in-1", price: 89000, qty: 1, img: "🔌" },
    ],
    productPrice: 479000,
    delivery: 5000,
    total: 484000,
  },
];

export const PROCESS_ORDERS: Order[] = [
  {
    id: "#XL-3815",
    date: "2025-04-05 14:32",
    items: [
      { name: 'LG UltraFine 4K 27"', price: 820000, qty: 1, img: "🖥️" },
      { name: "Logitech MX Keys", price: 168000, qty: 1, img: "⌨️" },
    ],
    productPrice: 988000,
    delivery: 5000,
    total: 993000,
  },
  {
    id: "#XL-3810",
    date: "2025-04-03 09:18",
    items: [
      { name: "Samsung 990 Pro SSD 2TB", price: 245000, qty: 2, img: "💾" },
    ],
    productPrice: 490000,
    delivery: 5000,
    total: 495000,
  },
];

export const FINISHED_ORDERS: Order[] = [
  {
    id: "#XL-3801",
    date: "2025-03-28",
    items: [
      { name: "ASUS ROG Zephyrus G14", price: 2150000, qty: 1, img: "💻" },
      { name: "Keychron Q1 Pro", price: 198000, qty: 1, img: "⌨️" },
    ],
    productPrice: 2348000,
    delivery: 5000,
    total: 2353000,
  },
  {
    id: "#XL-3796",
    date: "2025-03-22",
    items: [
      { name: 'iPad Pro 13" M4', price: 1680000, qty: 1, img: "📱" },
      { name: "Apple Pencil Pro", price: 189000, qty: 1, img: "✏️" },
    ],
    productPrice: 1869000,
    delivery: 5000,
    total: 1874000,
  },
];
