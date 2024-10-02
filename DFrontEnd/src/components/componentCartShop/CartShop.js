import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import "./CartShop.css";
import { tokenSession } from "../../services/serviesTokenSessionStored";
import CookiesAxios from "../../services/CookiesAxios";
import { toast } from "react-toastify";
import { useCart } from "../../CartContext";
import { useNavigate } from "react-router-dom";
const ShoppingCart = ({ handleClose, handleShow, show }) => {
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" cho tăng dần, "desc" cho giảm dần
  const [dataUser, setDataUser] = useState([]);
  const [name, setName] = useState(dataUser.TEN);
  const [address, setAddress] = useState(dataUser.DIACHI);
  const [phone, setPhone] = useState(dataUser.SODIENTHOAI);
  const [avatar, setAvatar] = useState(dataUser.avatar);

  const navigate = useNavigate();
  const {
    addToCart,
    setDataCart,
    dataCart,
    maKhachHang,
    setMaKhachHang,
    tongSoTien,
    setTongSoTien,
  } = useCart();
  useEffect(() => {
    fetchCartUser();
    fetchUser();
  }, [show]);
  const fetchCartUser = async () => {
    const username = await tokenSession();
    if (username) {
      try {
        const response = await CookiesAxios.post(
          "http://localhost:3003/api/v1/cart/data",
          { username: username }
        );

        // Log the entire response to inspect its structure
        console.log("Full response:", response);

        // Ensure the data property exists before accessing it
        if (response && response.data) {
          console.log("Response Data:", response.data);
          if (response.data.EC === 1) {
            if (
              response.data.DT &&
              response.data.DT.sanPham &&
              response.data.DT.sanPham.length > 0
            ) {
              setDataCart(response.data.DT.sanPham);
              setTongSoTien(response.data.DT.tongSoTien?.tongSoTien || 0); // Safeguard access to tongSoTien
            } else {
              console.log("Không có sản phẩm nào trong giỏ hàng.");
              setDataCart([]); // Giỏ hàng trống
              setTongSoTien(0); // Đặt tổng số tiền về 0
            }
          } else {
            console.log("Server error code is not 1:", response.data.EC);
          }
        } else {
          console.error("Response does not contain expected 'data' structure.");
        }
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
      }
    }
  };

  const fetchUser = async () => {
    const username = await tokenSession();
    if (username) {
      try {
        const response = await CookiesAxios.post(
          "http://localhost:3003/api/v1/user/thongtin",
          { username: username }
        );
        console.log(response.data); // In ra phản hồi từ server
        if (response.data.EC === 1) {
          setDataUser(response.data.DT);
          setName(response.data.DT[0].TEN);
          setPhone(response.data.DT[0].SODIENTHOAI);
          setAvatar(response.data.DT[0].avatar);
          setAddress(response.data.DT[0].DIACHI);
          setMaKhachHang(response.data.DT[0].MAKHACHHANG);
        }
      } catch (error) {
        console.error("Lỗi khi xem thông tin người dùng:", error.response.data);
      }
    }
  };
  const formattedTongSoTien =
    tongSoTien !== null
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(tongSoTien)
      : "Chưa tính";

  // Hàm sắp xếp
  const sortedDataCart =
    dataCart && dataCart.length > 0
      ? [...dataCart].sort((a, b) => {
          if (sortOrder === "asc") {
            return a.GIA - b.GIA; // Sắp xếp tăng dần
          } else {
            return b.GIA - a.GIA; // Sắp xếp giảm dần
          }
        })
      : []; // Nếu dataCart rỗng, trả về mảng rỗng

  const handleThanhToan = async () => {
    // Kiểm tra xem các trường cần thiết đã được điền hay chưa
    if (!maKhachHang || !dataCart || dataCart.length === 0) {
      toast.error("Vui lòng thêm hàng vào giỏ hàng của bạn.");
      return; // Ngừng thực hiện nếu có trường không hợp lệ
    }
    console.log("dataCart", dataCart);
    navigate("/cart-mua-hang");
  };

  const handleRemoveItem = async (ma_gio_hang) => {
    try {
      const response = await CookiesAxios.post(
        `http://localhost:3003/api/v1/cart/delete`,
        { ma_gio_hang: ma_gio_hang, MAKHACHHANG: maKhachHang }
      );

      console.log("Xóa thành công:", response.data);
      if (response.data.EC === 1) {
        const username = await tokenSession();
        console.log("response.data.DT.length", response.data.DT);

        // Kiểm tra nếu DT tồn tại và không rỗng

        setTongSoTien(response.data.DT);
        fetchCartUser(); // Gọi hàm fetchCartUser nếu DT không rỗng

        addToCart(username);
      } else if (response.data.EC === 0) {
        setTongSoTien(0);
        setDataCart([]);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg" // Thay đổi thành "sm", "lg", hoặc "xl" theo nhu cầu
        aria-labelledby="example-custom-modal-styling-title"
        style={{
          height: "100vh", // Chiều cao của modal
          border: "none",
          borderRadius: 0,
          backgroundColor: "transparent",
        }}
        className="custom-modal" // Thêm class tùy chỉnh
      >
        <div className="container  h-100 div-cart">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-md-12">
              <div className="row">
                <div className="col-lg-7">
                  <h5 className="mb-3" onClick={handleClose}>
                    <a href="#!" className="text-body">
                      <i className="fas fa-long-arrow-alt-left me-2"></i>
                      Tiếp tục mua sắm
                    </a>
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p className="mb-1">Giỏ hàng</p>
                      <p className="mb-0">
                        Bạn có {dataCart.length || "0"} mặt hàng trong giỏ hàng
                      </p>
                    </div>
                    <div>
                      <p className="mb-0">
                        <span className="text-muted">Sắp xếp theo:</span>
                        <a
                          href="#!"
                          className="text-body"
                          onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }
                        >
                          giá{" "}
                          <i
                            className={`fas fa-angle-${
                              sortOrder === "asc" ? "down" : "up"
                            } mt-1`}
                          ></i>
                        </a>
                      </p>
                    </div>
                  </div>

                  {sortedDataCart.length > 0 ? (
                    sortedDataCart.map((item, index) => (
                      <div className="card mb-3" key={index}>
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={`http://localhost:3003/images/${item.description}`}
                                  className="img-fluid rounded-3 img-fluid"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{item.title}</h5>
                                <p className="small mb-0">{item.TENSANPHAM}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0 cart-item-gia">
                                  {item.so_luong}
                                </h5>
                              </div>
                              <div style={{ width: "90px" }}>
                                <h5 className="mb-0 cart-item-gia">
                                  ${item.GIA}
                                </h5>
                              </div>
                              <a
                                href="#!"
                                style={{ color: "#cecece" }}
                                onClick={() =>
                                  handleRemoveItem(item.ma_gio_hang)
                                }
                              >
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </Card.Body>
                      </div>
                    ))
                  ) : (
                    <p>Không có sản phẩm nào trong giỏ hàng.</p>
                  )}
                </div>
                <div className="col-lg-5">
                  <Card className="bg-primary text-white rounded-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        {/* <h5 className="mb-0">Thông tin cá nhân</h5> */}
                        <img
                          src={`http://localhost:3003/images/${avatar || ""}`}
                          className="img-fluid rounded-3 img-fluid"
                          style={{ width: "45px" }}
                          alt="Avatar"
                        />
                      </div>
                      {/* 
                      <Form className="mt-4">
                        <Form.Group className="form-outline form-white mb-4">
                          <Form.Control
                            type="text"
                            value={name || "Tên khách hàng chưa được cung cấp"}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên khách hàng"
                          />
                          <Form.Label>Tên khách hàng</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-outline form-white mb-4">
                          <Form.Control
                            type="text"
                            value={address || "Địa chỉ chưa được cung cấp"}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Địa chỉ"
                          />
                          <Form.Label>Địa chỉ</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-outline form-white mb-4">
                          <Form.Control
                            type="text"
                            value={phone || "Số điện thoại chưa được cung cấp"}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Số điện thoại"
                          />
                          <Form.Label>Số điện thoại</Form.Label>
                        </Form.Group>
                      </Form> */}

                      <hr className="my-4" />
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Tổng tiền</p>
                        <p className="mb-2">
                          {formattedTongSoTien || "Chưa tính"}
                        </p>
                      </div>

                      <Button
                        variant="info"
                        className="btn-block btn-lg"
                        onClick={handleThanhToan}
                      >
                        <div className="d-flex justify-content-between cart-item-gia">
                          <span>{formattedTongSoTien || "Chưa tính"}</span>
                          <span>
                            Thanh toán
                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                          </span>
                        </div>
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShoppingCart;
