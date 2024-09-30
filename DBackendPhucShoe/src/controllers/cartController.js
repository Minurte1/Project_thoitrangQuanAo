const pool = require("../config/old");
const { cartUserServices } = require("../services/apiCartServices");
const cartUser = async (req, res) => {
  try {
    console.log("cart", req.body);
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

module.exports = { cartUser };
