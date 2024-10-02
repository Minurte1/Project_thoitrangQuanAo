// CartContext.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import CookieAxios from "../src/services/CookiesAxios";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [soLuongSanPham, setSoLuongSanPham] = useState(0);
  const [maKhachHang, setMaKhachHang] = useState(null); // Thêm state cho mã khách hàng
  const [dataCart, setDataCart] = useState([]); // Thêm state cho dữ liệu giỏ hàng
  const [tongSoTien, setTongSoTien] = useState(null);
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
        maKhachHang, // Cung cấp mã khách hàng
        setMaKhachHang, // Cung cấp phương thức thiết lập mã khách hàng
        dataCart, // Cung cấp dữ liệu giỏ hàng
        setDataCart, // Cung cấp phương thức thiết lập dữ liệu giỏ hàng
        tongSoTien,
        setTongSoTien,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
