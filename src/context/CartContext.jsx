import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("gocart_cart") || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  const updateItems = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem("gocart_cart", JSON.stringify(nextItems));
  };

  const addItem = (product) => {
    const existing = items.find((item) => item.id === product.id);
    updateItems(existing
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }]);
  };

  const setQuantity = (id, quantity) => {
    if (quantity < 1) return removeItem(id);
    updateItems(items.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => updateItems(items.filter((item) => item.id !== id));
  const clearCart = () => updateItems([]);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return <CartContext.Provider value={{ items, addItem, setQuantity, removeItem, clearCart, total, count }}>
    {children}
  </CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}