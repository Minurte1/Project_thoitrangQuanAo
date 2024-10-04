// MuaHang.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import "../../assets/styles/muahang.css"; // Import tệp CSS
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoadingComponent from "../../components/ComponentLoading/CompnentLoading.tsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../CartContext";
import CookiesAxios from "../../services/CookiesAxios.js";
const MuaHangCart = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { maKhachHang, dataCart, tongSoTien } = useCart();

  const [TinhUser, setTinhUser] = useState(null);
  const [HuyenUser, setHuyenUser] = useState(null);
  const [XaUser, setXaUser] = useState(null);
  const [username, setdecodedTokenUsername] = useState(null);
  const [Token, setToken] = useState(null);
  const [IsOpenContractCustomer, setIsOpenContractCustomer] = useState(false);
  const [profileUser, setprofileUser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!dataCart) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dataCart]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setdecodedTokenUsername(decoded.taikhoan);
        setIsOpenContractCustomer(true);
        setToken(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  const [DiachiUsertoBack, setDiachiUsertoBack] = useState(null);
  const [name, setname] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [note, setnote] = useState(null);
  const [orderTime, setOrderTime] = useState(null);
  const [DiachiUser, setDiachiUser] = useState(null);
  const [ApUser, setApUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem tất cả các biến đã được thiết lập hay chưa
    if (
      TinhUser !== null &&
      HuyenUser !== null &&
      XaUser !== null &&
      ApUser !== null
    ) {
      // Ghép các biến thành một chuỗi và cập nhật DiachiUser
      setDiachiUsertoBack(
        `${ApUser}, xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      );
    }
  }, [TinhUser, HuyenUser, XaUser, ApUser]);

  useEffect(() => {
    if (profileUser && profileUser.length > 0) {
      const { TEN, DIACHI, SODIENTHOAI } = profileUser[0];
      setname(TEN);
      setDiachiUser(DIACHI);
      setphoneNumber(SODIENTHOAI);

      if (profileUser) {
        const parts = DiachiUser ? DiachiUser.split(", ") : [];

        // Gán giá trị vào các state
        setXaUser(parts[1]);
        setHuyenUser(parts[2]);
        setTinhUser(parts[3]);
        setApUser(parts[0]);
      }

      // console.log(DIACHI);
    }
  }, [profileUser]);

  const generateRandomCustomerID = () => {
    // Lấy thời gian Unix (milliseconds)
    const randomPart = Math.floor(Math.random() * 100000);
    // Số ngẫu nhiên từ 0 đến 999
    return randomPart;
  };
  const [paymentMethod, setPaymentMethod] = useState("tại-nhà");
  const [customerID, setCustomerID] = useState(generateRandomCustomerID());

  const handleThanhToan = async () => {
    // Kiểm tra dữ liệu đầu vào
    if (
      !maKhachHang ||
      !name ||
      !DiachiUsertoBack ||
      !phoneNumber ||
      !dataCart ||
      dataCart.length === 0
    ) {
      toast.error(
        "Vui lòng điền đầy đủ thông tin và có sản phẩm trong giỏ hàng."
      ); // Hiển thị thông báo lỗi
      return; // Dừng lại nếu dữ liệu không hợp lệ
    }

    try {
      const response = await CookiesAxios.post(
        `http://localhost:3003/api/v1/cart/thanhtoan`,
        {
          MAKHACHHANG: maKhachHang,
          name: name,
          dataDiachi: DiachiUsertoBack,
          phone: phoneNumber,
          dataCart,
        }
      );

      if (response.data.EC === 1) {
        navigate("/");
        toast.success("Đã đặt hàng, chủ shop sẽ liên hệ với bạn nhanh nhất");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại."); // Thông báo lỗi nếu có sự cố
    }
  };

  // ----------------------------------------API tỉnh thành ----------------------------------------

  useEffect(() => {
    // Kiểm tra xem tất cả các biến đã được thiết lập hay chưa
    if (TinhUser !== null && HuyenUser !== null && XaUser !== null) {
      console.log("oke !!");
      // Ghép các biến thành một chuỗi và cập nhật DiachiUser
      setDiachiUsertoBack(
        ` xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      );
    }
  }, [TinhUser, HuyenUser, XaUser]);

  const handleClickChecked = async () => {
    setIsChecked(!isChecked);
    console.log("checked", isChecked);
    if (!isChecked) {
      fetchAvatarCustomer();
      setTimeout(() => {
        fetchAvatarCustomer();
      }, 1000);
    } else {
      toast.success("Thêm dữ liệu thành công !!");
    }
  };
  const fetchAvatarCustomer = async () => {
    try {
      const axiosWithCredentials = axios.create({
        withCredentials: true, // Bật sử dụng cookie trong yêu cầu
        headers: {
          Authorization: `Bearer ${Token}`, // Thay yourToken bằng token của bạn
        },
      });
      const DataHang = await axiosWithCredentials.get(
        `http://localhost:3003/api/v1/user/info/${username}`
      );
      setprofileUser(DataHang.data.DT.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const handlePayment = () => {
    // Kiểm tra dữ liệu
    if (
      !name ||
      !DiachiUsertoBack ||
      !phoneNumber ||
      phoneNumber.length !== 10
    ) {
      toast.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại."); // Hiển thị thông báo nếu dữ liệu rỗng
      return; // Không mở cửa sổ mới
    }

    // Nếu dữ liệu hợp lệ, mở cửa sổ mới
    window.open(
      "https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder",
      "_blank"
    );
  };
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  if (Loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <div className="div-logomuahang">
        {" "}
        <a href="/" id="logophucshoe">
          Quần Áo
        </a>
      </div>

      <div className="muahang-container">
        <div className="container-setup">
          <div className="muahang-giay-info">
            <form className="muahang-form">
              <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
              <label className="muahang-label">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setname(event.target.value)}
                  className="muahang-input hoten"
                  placeholder="Họ và tên"
                />
              </label>{" "}
              <br />
              <label className="muahang-label">
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => setphoneNumber(event.target.value)}
                  className="muahang-input muahang-sdt"
                  placeholder="Số điện thoại "
                />
              </label>
              {/* --------END-----API---------------------------- */}
              <div class="mb-12">
                <input
                  placeholder="Tỉnh"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={TinhUser}
                  onChange={(event) => setTinhUser(event.target.value)}
                />
              </div>
              <div class="mb-12">
                <input
                  placeholder="Huyện"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={HuyenUser}
                  onChange={(event) => setHuyenUser(event.target.value)}
                />
              </div>
              <div class="mb-12">
                <input
                  placeholder="Xã"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={XaUser}
                  onChange={(event) => setXaUser(event.target.value)}
                />
              </div>
              <label className="muahang-label">
                <input
                  type="text"
                  name="address"
                  value={ApUser}
                  onChange={(event) => setApUser(event.target.value)}
                  className="muahang-input muahang-sonha"
                  placeholder="Số nhà và tên đường"
                />
              </label>
              <br />
              <label className="muahang-label">
                <input
                  type="text"
                  name="note"
                  value={note}
                  onChange={(event) => setnote(event.target.value)}
                  className="muahang-input"
                  placeholder="Ghi chú"
                />
              </label>
              <div>
                <select
                  className="muahang-input thanh-toan marginlert"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                >
                  <option value="tại-nhà">Thanh toán tại nhà</option>
                  <option value="trực-tuyến">Tính tiền trực tuyến</option>
                </select>
              </div>
              {IsOpenContractCustomer && (
                <div className="form-muahang-hoso mt-2">
                  <p>Bạn có muốn sử dụng thông tin trong hồ sơ để mua hàng?</p>{" "}
                  <div class="form-check">
                    <label class="form-check-label">Hãy bật tắt nó</label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="check1"
                      name="option1"
                      value="something"
                      onClick={handleClickChecked}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="muahang-customer-info">
            <div className="hr-xoaydoc"></div>
            <div className="thongtin-sanpham">
              {dataCart.map((item, index) => (
                <div key={index} className="thongtin-sanpham_2">
                  <span className="discount-bannerr discount-bannerr-cart">
                    {item.so_luong}{" "}
                  </span>
                  <img
                    src={`http://localhost:3003/images/${item.description}`}
                    className="sanpham-img size-img-product"
                    alt={`${item.TENSANPHAM}`}
                  />
                  <span className="sanpham-name">{item.TENSANPHAM} </span>
                  <span className="sanpham-price">{item.GIA}đ</span>{" "}
                  <span className="sanpham-name">
                    &nbsp; &nbsp; x{item.so_luong}{" "}
                  </span>
                  <span className="sanpham-price">
                    = &nbsp; &nbsp;{item.tong_tien}đ
                  </span>
                </div>
              ))}
              <hr />
              <label className="muahang-magiamgia1">
                <input
                  type="text"
                  className="muahang-magiamhgia"
                  placeholder="Mã giảm giá (nếu có)"
                />
                <button className="muahang-xacnhan">Sử Dụng</button>
              </label>

              <div className="muahang-phivanchuyen"></div>
              <hr />
              <div className="muahang-tongcong">
                <span>Tổng cộng</span>
                <span className="muahang-tongcong1">{tongSoTien}đ</span>
              </div>
              {paymentMethod === "tại-nhà" ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      handleThanhToan();
                    }}
                    className="muahang-button"
                  >
                    Thanh toán tại nhà
                  </button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <a
                    type="button"
                    className="muahang-button thanhtoan-onlne"
                    onClick={handlePayment} // Gọi hàm kiểm tra và mở cửa sổ
                  >
                    Thanh toán trực tuyến
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MuaHangCart;
