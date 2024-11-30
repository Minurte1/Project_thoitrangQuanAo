const connection = require("../config/old.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
  getThongtinUser,
  updateUser,
  updateAvatarUser,
  DeleteUser,
  postLoginAdmin,
  createLoginAdmin,
  updatePasswordUser,
  buyProductpost,
  updateAdminPassword,
  getDataUserServices,
} = require("../services/apiCRUDServices");

const CreateUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginUser(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const results = await getUser();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await postLoginUser(taikhoan, matkhau);
    // console.log("User logged in", results);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getInfoUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const results = await getThongtinUser(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getDataUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;

    const results = await getDataUserServices(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const CapnhatUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const ten = req.body.ten;
    const diachi = req.body.diachi;
    const sodienthoai = req.body.sodienthoai;
    const results = await updateUser(taikhoan, ten, diachi, sodienthoai);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatAdmin = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const mk2 = req.body.password2;
    const matkhaumoi = req.body.newpassword;
    const results = await updateAdminPassword(
      taikhoan,
      matkhau,
      mk2,
      matkhaumoi
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatAvatarUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const results = await updateAvatarUser(taikhoan, req.file.filename);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatPasswordUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const matkhaucu = req.body.passwordcu;
    const matkhaumoi = req.body.passwordmoi;

    const results = await updatePasswordUser(taikhoan, matkhaucu, matkhaumoi);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const results = await DeleteUser(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const loginAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);
    const results = await postLoginAdmin(username, password);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const registerAdmin = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginAdmin(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout Thành Công !!!",
      EC: 0,
      DT: " ",
    });
  } catch {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const muahangUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    console.log("username", taikhoan);
    const ten = req.body.name;
    const diachi = req.body.dataDiachi;
    const ghichu = req.body.note;
    const masp = req.body.IdSP;
    const sodienthoai = req.body.phoneNumber;
    const soluong = req.body.SoluongDaMua;
    const thanhtien = req.body.Tongtien;
    const kichCo = req.body.kichCo.GIATRI;

    const PHUONGTHUCTHANHTOAN = req.body.PHUONGTHUCTHANHTOAN;
    // console.log("req.body", req.body);
    const results = await buyProductpost(
      taikhoan,
      ten,
      diachi,
      ghichu,
      sodienthoai,
      masp,
      soluong,
      thanhtien,
      kichCo,
      PHUONGTHUCTHANHTOAN
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};
const countUsers = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT COUNT(*) AS totalUsers FROM users`
    );
    console.log("check", results);
    return res.status(200).json({
      EM: "Tính tổng số lượng user thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};

// API cập nhật GHICHU
const updateTrangThaiTaiKhoan = async (req, res) => {
  const { MAKHACHHANG, GHICHU } = req.body;

  if (!MAKHACHHANG || !GHICHU) {
    return res.status(400).json({
      EM: "Thiếu thông tin MAKHACHHANG hoặc GHICHU",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra sự tồn tại của khách hàng
    const [existingCustomer] = await connection.execute(
      "SELECT * FROM `khachhang` WHERE `MAKHACHHANG` = ?",
      [MAKHACHHANG]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        EM: "Khách hàng không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    // Cập nhật GHICHU
    const [updateResult] = await connection.execute(
      "UPDATE `khachhang` SET `GHICHU` = ? WHERE `MAKHACHHANG` = ?",
      [GHICHU, MAKHACHHANG]
    );

    if (updateResult.affectedRows > 0) {
      return res.status(200).json({
        EM: "Cập nhật ghi chú thành công",
        EC: 1,
        DT: {
          MAKHACHHANG,
          GHICHU,
        },
      });
    } else {
      return res.status(500).json({
        EM: "Cập nhật ghi chú thất bại",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error in update-ghichu:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống, vui lòng thử lại sau",
      EC: -1,
      DT: [],
    });
  }
};

const updateTrangThaiTaiKhoan_Login = async (req, res) => {
  const { username, GHICHU } = req.body;

  if (!username || !GHICHU) {
    return res.status(400).json({
      EM: "Thiếu thông tin MAKHACHHANG hoặc GHICHU",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra sự tồn tại của khách hàng
    const [existingCustomer] = await connection.execute(
      "SELECT * FROM `users` WHERE `taikhoan` = ?",
      [username]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        EM: "Khách hàng không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    // Cập nhật GHICHU
    const [updateResult] = await connection.execute(
      "UPDATE `khachhang` SET `GHICHU` = ? WHERE `taikhoan` = ?",
      [GHICHU, username]
    );

    if (updateResult.affectedRows > 0) {
      return res.status(200).json({
        EM: "Tài khoản đã bị khóa",
        EC: 1,
        DT: {
          username,
          GHICHU,
        },
      });
    } else {
      return res.status(500).json({
        EM: "Tài khoản đã bị khóa",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error in update-ghichu:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống, vui lòng thử lại sau",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  CreateUser,
  getAllUser,
  loginUser,
  getInfoUser,
  CapnhatUser,
  CapnhatAvatarUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
  logoutUser,
  muahangUser,
  countUsers,
  CapnhatAdmin,
  getDataUser,
  updateTrangThaiTaiKhoan,
  updateTrangThaiTaiKhoan_Login,
};
