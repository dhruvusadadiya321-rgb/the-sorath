import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // LocalStorage check with Error Handling
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading localStorage", error);
      return [];
    }
  });

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- ADD TO CART FUNCTION ---
  const addToCart = (product, quantity = 1, size = 'Free Size', color = 'Default') => {
    console.log("Attempting to add product:", product); 

    if (!product) {
      alert("Error: Product data is missing!");
      return;
    }

    setCartItems(prevItems => {
      const productId = product._id || product.id;
      
      const existingItem = prevItems.find(item => (item._id || item.id) === productId);

      if (existingItem) {
        console.log("Updating quantity for existing item");
        return prevItems.map(item =>
          (item._id || item.id) === productId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      console.log("Adding new item");
      return [...prevItems, { ...product, quantity, size, color }];
    });

    alert("✅ Product Added to Cart!");
  };

  // --- REMOVE FUNCTION ---
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => (item._id || item.id) !== id));
  };

  // --- UPDATE QUANTITY ---
  const updateQuantity = (id, type) => {
    setCartItems(prevItems => prevItems.map(item => {
      if ((item._id || item.id) === id) {
        return {
          ...item,
          quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    }));
  };

  // --- NEW FUNCTION: CLEAR CART (AA UMEIRU CHE) ---
  const clearCart = () => {
    setCartItems([]); // State khali karo
    localStorage.removeItem('cart'); // Storage saf karo
  };

  return (
    <CartContext.Provider value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart // <--- Ahiya export karyu che
    }}>
      {children}
    </CartContext.Provider>
  );
};