import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localData = localStorage.getItem('wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      // Check if already exists
      const exists = prev.find(item => (item._id || item.id) === (product._id || product.id));
      if (exists) {
        alert("Already in your Wishlist!");
        return prev;
      }
      alert("Added to Wishlist ❤️");
      return [...prev, product];
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  // Check if item is in wishlist (Heart icon color mate)
  const isInWishlist = (id) => {
    return wishlistItems.some(item => (item._id || item.id) === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};