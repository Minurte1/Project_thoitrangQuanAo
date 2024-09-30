const pool = require("../config/old");
const cartUserServices = async (username, product, quantity = 1) => {
  try {
    // Check if the user exists in the 'khachhang' table
    const [results, fields] = await pool.execute(
      `SELECT MAKHACHHANG FROM khachhang WHERE taikhoan = ?`,
      [username]
    );

    if (results.length === 0) {
      return {
        EM: "Người mua không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    const MAKHACHHANG = results[0].MAKHACHHANG;

    // Check if the product is already in the user's cart
    const [results_giohang, fields_giohang] = await pool.execute(
      `SELECT *, so_luong FROM gio_hang WHERE MAKHACHHANG = ? AND MASP = ?`,
      [MAKHACHHANG, product.MASP]
    );
    console.log("results_giohang", results_giohang.length);
    if (results_giohang.length > 0) {
      // If the product exists in the cart, update the quantity
      const so_luong_trongGioHang = results_giohang[0].so_luong;
      const so_tien_trongGioHang = results_giohang[0].tong_tien;
      const tong_tien =
        parseFloat(so_tien_trongGioHang) + parseFloat(product.GIA);
      const newQuantity = so_luong_trongGioHang + quantity;
      console.log("tong_tien", tong_tien);
      console.log("newQuantity", newQuantity);
      await pool.execute(
        `UPDATE gio_hang SET so_luong = ?, tong_tien=? WHERE ma_gio_hang = ?`,
        [newQuantity, tong_tien, results_giohang[0].ma_gio_hang]
      );

      return {
        EM: "Cập nhật số lượng sản phẩm thành công",
        EC: 1,
        DT: [],
      };
    } else {
      await pool.execute(
        `INSERT INTO gio_hang (MAKHACHHANG, MASP, so_luong,tong_tien) VALUES (?, ?, ?,?)`,
        [MAKHACHHANG, product.MASP, quantity, product.GIA]
      );

      return {
        EM: "Thêm sản phẩm vào giỏ hàng thành công",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error processing cart update:", error);
    return {
      EM: "Có lỗi xảy ra trong quá trình xử lý giỏ hàng",
      EC: -1,
      DT: error,
    };
  }
};

module.exports = {
  cartUserServices,
};
