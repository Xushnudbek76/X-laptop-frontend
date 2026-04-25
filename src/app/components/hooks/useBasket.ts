import { useState } from "react";
import type { CartItem } from "../../../lib/types/cart";

const useBasket = () => {


  const cartJson = localStorage.getItem("cartItems");
  const initialCartItems = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleAddToCart = (product: CartItem) => {
  const duplicateItem = cartItems.find((item) => item._id === product._id);

  if (duplicateItem) {
    const updatedCart = cartItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: duplicateItem.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  } else {
    const newCart = [...cartItems, { ...product, quantity: 1 }];
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  }
};
const handleRemoveFromCart = (product: CartItem) => {
  const updatedCart = cartItems.map((item) =>
    item._id === product._id
      ? { ...item, quantity: (item.quantity ?? 1) - 1 }
      : item
  ).filter((item) => item.quantity > 0);
  setCartItems(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

const handleDeleteFromCart = (product: CartItem) => {
  const updatedCart = cartItems.filter((item) => item._id !== product._id);
  setCartItems(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

const handleDeleteAll = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
};

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleDeleteFromCart,
    handleDeleteAll,
  };
}

export default useBasket;