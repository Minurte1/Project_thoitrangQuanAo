const pool = require("../config/old");
const {
  cartUserServices,
  getDataCartUserServices,
  deleteCart,
  thanhToanCartServices,
  soLuongSPtrongGHServices,
} = require("../services/apiCartServices");
const cartUser = async (req, res) => {
  try {
    // console.log("cart", req.body);
    const username = req.body.username;
    const product = req.body.product;
    let results = await cartUserServices(username, product);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      EM: "lỗi controller getAllTaiKhoanController",
      EC: -1,
      DT: [],
    });
  }
};

const getDataCartUser = async (req, res) => {
  try {
    // console.log("cart", req.body);
    const username = req.body.username;

    let results = await getDataCartUserServices(username);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      EM: "lỗi controller getAllTaiKhoanController",
      EC: -1,
      DT: [],
    });
  }
};
const deleteCartUser = async (req, res) => {
  const ma_gio_hang = req.body.ma_gio_hang;

  try {
    let results = await deleteCart(ma_gio_hang);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      EM: "lỗi controller getAllTaiKhoanController",
      EC: -1,
      DT: [],
    });
  }
};
const thanhToanCartUser = async (req, res) => {
  // console.log(req.body);
  const MAKHACHHANG = req.body.MAKHACHHANG;
  const name = req.body.name;
  const diachi = req.body.dataDiachi;
  const phone = req.body.phone;
  const dataCart = req.body.dataCart;
  try {
    let results = await thanhToanCartServices(
      MAKHACHHANG,
      name,
      diachi,
      phone,
      dataCart
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      EM: "lỗi controller getAllTaiKhoanController",
      EC: -1,
      DT: [],
    });
  }
};
const soLuongSPtrongGioHang = async (req, res) => {
  const username = req.body.username;
  try {
    let results = await soLuongSPtrongGHServices(username);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      EM: "lỗi controller getAllTaiKhoanController",
      EC: -1,
      DT: [],
    });
  }
};
module.exports = {
  cartUser,
  getDataCartUser,
  deleteCartUser,
  thanhToanCartUser,
  soLuongSPtrongGioHang,
};
