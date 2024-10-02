// CartContext.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import CookieAxios from "../src/services/CookiesAxios";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [soLuongSanPham, setSoLuongSanPham] = useState(0);

  const fetchSoLuongGioHang = async (username) => {
    if (username) {
      try {
        const response = await CookieAxios.post(
          `http://localhost:3003/api/v1/cart/quantity/`,
          { username: username }
        );
        console.log("response.data", response.data);
        if (response.data.EC === 1) {
          setSoLuongSanPham(response.data.DT);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const addToCart = (username) => {
    fetchSoLuongGioHang(username);
  };

  return (
    <CartContext.Provider
      value={{
        soLuongSanPham,
        setSoLuongSanPham,
        fetchSoLuongGioHang,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
