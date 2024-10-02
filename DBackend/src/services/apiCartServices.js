const pool = require("../config/old");
const { format } = require("date-fns");

const saltRounds = 10;
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};

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
    // console.log("results_giohang", results_giohang.length);
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

const getDataCartUserServices = async (username) => {
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
      `SELECT * FROM gio_hang WHERE MAKHACHHANG = ? `,
      [MAKHACHHANG]
    );
    // console.log("results_giohang", results_giohang);
    if (results_giohang.length > 0) {
      const [results_data, fields_data] = await pool.execute(
        `SELECT sanpham.*, gio_hang.* FROM sanpham, gio_hang WHERE  sanpham.MASP = gio_hang.MASP and gio_hang.MAKHACHHANG = ? `,
        [MAKHACHHANG]
      );
      const [results_, fields_] = await pool.execute(
        `SELECT sum(tong_tien) as tongSoTien FROM  gio_hang WHERE MAKHACHHANG = ? `,
        [MAKHACHHANG]
      );
      // console.log("results_giohang", results_[0]);
      return {
        EM: "Xem giỏ hàng thành công",
        EC: 1,
        DT: { sanPham: results_data, tongSoTien: results_[0] },
      };
    } else {
      return {
        EM: "Giỏ hàng rỗng",
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

const deleteCart = async (ma_gio_hang) => {
  try {
    // Lấy giá trị so_luong và tong_tien hiện tại của sản phẩm trong giỏ hàng
    const [rows] = await pool.execute(
      "SELECT MASP, so_luong, tong_tien, (tong_tien / so_luong) AS gia_san_pham FROM gio_hang WHERE ma_gio_hang = ?",
      [ma_gio_hang]
    );
    console.log("productPrice", rows[0].MASP);

    // Kiểm tra nếu sản phẩm tồn tại
    if (rows.length > 0) {
      const currentQuantity = rows[0].so_luong;
      const currentTotal = rows[0].tong_tien;
      const [result_GIA] = await pool.execute(
        "SELECT GIA  FROM sanpham WHERE MASP = ?",
        [rows[0].MASP]
      );

      const productPrice = result_GIA[0].GIA; // Giá sản phẩm
      console.log("productPrice", productPrice);
      console.log("tongtien", currentTotal);
      console.log("soluong", currentQuantity);
      const newTongtien = currentTotal - productPrice;
      // Nếu số lượng lớn hơn 1, thì giảm đi 1
      if (currentQuantity > 1) {
        await pool.execute(
          "UPDATE gio_hang SET so_luong = so_luong - 1, tong_tien =? WHERE ma_gio_hang = ?",
          [newTongtien, ma_gio_hang]
        );
        const [rows] = await pool.execute(
          "SELECT MASP, so_luong, tong_tien, (tong_tien / so_luong) AS gia_san_pham FROM gio_hang WHERE ma_gio_hang = ?",
          [ma_gio_hang]
        );
        if (rows.length < 1) {
          return {
            EM: "Sản phẩm không tồn tại trong giỏ hàng",
            EC: 0,
            DT: [],
          };
        } else {
          return {
            EM: "Giảm số lượng sản phẩm thành công",
            EC: 1,
            DT: {
              tong_tien: currentTotal - productPrice, // Tính tổng số tiền mới
            },
          };
        }
      } else {
        // Nếu số lượng bằng 1, có thể xóa sản phẩm khỏi giỏ hàng
        await pool.execute("DELETE FROM gio_hang WHERE ma_gio_hang = ?", [
          ma_gio_hang,
        ]);
        return {
          EM: "Đã xóa sản phẩm khỏi giỏ hàng",
          EC: 1,
          DT: {
            tong_tien: productPrice, // Trả về giá trị của sản phẩm đã xóa
          },
        };
      }
    } else {
      return {
        EM: "Sản phẩm không tồn tại trong giỏ hàng",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error processing cart update:", error);
    return {
      EM: "Có lỗi xảy ra trong quá trình cập nhật giỏ hàng",
      EC: -1,
      DT: error,
    };
  }
};

const thanhToanCartServices = async (
  MAKHACHHANG,
  name,
  diachi,
  phone,
  dataCart
) => {
  const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const connection = await pool.getConnection(); // Sử dụng connection để quản lý transaction
  try {
    await connection.beginTransaction(); // Bắt đầu transaction

    // Xóa giỏ hàng theo MAKHACHHANG
    await connection.execute("DELETE FROM gio_hang WHERE MAKHACHHANG = ?", [
      MAKHACHHANG,
    ]);

    // Thêm vào bảng donhang
    const [donHangResult] = await connection.execute(
      "INSERT INTO donhang (MAKHACHHANG, NGAYDONHANG, TRANGTHAI, ten, diachi, sodienthoai, ghichu) VALUES (?, ?, 'ChuaGiao', ?, ?, ?, NULL)",
      [MAKHACHHANG, currentTime, name, diachi, phone]
    );

    const MADONHANG = donHangResult.insertId; // Lấy ID của đơn hàng vừa được thêm

    // Thêm vào bảng chitietdonhang
    for (const item of dataCart) {
      const { MASP, SOLUONG, tong_tien } = item;
      await connection.execute(
        "INSERT INTO chitietdonhang (MADONHANG, MASP, SOLUONG, THANHTIEN, TRANGTHAI) VALUES (?, ?, ?, ?, 'ChuaGiao')",
        [MADONHANG, MASP, SOLUONG, tong_tien]
      );
    }

    // Commit transaction sau khi thành công
    await connection.commit();

    return {
      EM: "Thanh toán thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    await connection.rollback(); // Rollback nếu có lỗi
    console.error("Error processing cart checkout:", error);
    return {
      EM: "Có lỗi xảy ra trong quá trình thanh toán",
      EC: -1,
      DT: error,
    };
  } finally {
    connection.release(); // Đảm bảo release connection sau khi hoàn tất
  }
};
const soLuongSPtrongGHServices = async (username) => {
  try {
    // Truy vấn tổng số lượng sản phẩm trong giỏ hàng theo MAKHACHHANG
    console.log("username", username);
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

    const [rows] = await pool.execute(
      `SELECT SUM(so_luong) AS totalQuantity
       FROM gio_hang
       WHERE MAKHACHHANG = ?`,
      [MAKHACHHANG]
    );

    // Kiểm tra xem giỏ hàng có sản phẩm hay không
    console.log(rows[0].totalQuantity);
    if (rows.length > 0 && rows[0].totalQuantity !== null) {
      return {
        EM: "Số lượng sản phẩm thành công",
        EC: 1,
        DT: rows[0].totalQuantity,
      };
    } else {
      return {
        EM: "Giỏ hàng đang rỗng",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error fetching cart quantity:", error);
    return {
      EM: "Có lỗi xảy ra khi tính số lượng sản phẩm",
      EC: -1,
      error: error.message,
    };
  }
};
const changePassword = async (email, password) => {
  console.log(email, password);

  try {
    // Cập nhật mật khẩu trong bảng taikhoan
    if (!email || !password) {
      return {
        EM: "Emaill và password không hợp lệ",
        EC: 0,
        DT: [],
      };
    }
    const matkhauHashed = hashPassword(password);
    const [result] = await pool.execute(
      "UPDATE users SET matkhau = ? WHERE taikhoan = ?",
      [matkhauHashed, email]
    );

    return {
      EM: "Thay đổi mật khẩu thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.error("Error processing cart update:", error);
    return {
      EM: "Có lỗi xảy ra trong quá trình cập nhật mật khẩu",
      EC: -1,
      DT: error,
    };
  }
};
module.exports = {
  cartUserServices,
  getDataCartUserServices,
  deleteCart,
  thanhToanCartServices,
  soLuongSPtrongGHServices,
  changePassword,
};
