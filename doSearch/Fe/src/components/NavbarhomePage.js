import "../assets/styles/NavBar.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import avat from "../assets/img-avata/lufy2.jpg";
import ShoppingCart from "./componentCartShop/CartShop";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { useCart } from "../CartContext";
const MyNavbar = () => {
  const token = sessionStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [imgAvatar, setImgAvatar] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { soLuongSanPham, fetchSoLuongGioHang } = useCart();
  const axiosWithCredentials = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const DataHang = await axiosWithCredentials.get(
            `http://localhost:3003/api/v1/user/info/${username}`
          );
          setImgAvatar(DataHang.data.DT.results[0].avatar);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [username, axiosWithCredentials]);
  useEffect(() => {
    fetchSoLuongGioHang(username);
  }, [username]);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.taikhoan);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const handleLoginUser = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleProfile = () => {
    navigate(`/profile/${username}`, {
      state: { access_token: token },
    });
  };
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/");
    toast.success("Đăng xuất thành công ^^!");
  };

  //recomend
  const [productName, setProductName] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setProductName(value);

    // Gọi API khi người dùng nhập vào ô tìm kiếm
    if (value.trim()) {
      fetchRecommendations(value);
    } else {
      setRecommendations([]); // Nếu ô tìm kiếm trống, không hiển thị kết quả
    }
  };

  // Function to fetch recommendations from the API
  const fetchRecommendations = async (productName) => {
    try {
      // Gửi POST request đến API Flask
      const response = await axios.post(
        "http://localhost:5000/recommend",
        { product_name: productName },
        {
          headers: {
            "Content-Type": "application/json", // Đảm bảo tiêu đề Content-Type là application/json
          },
        }
      );
      // Lưu kết quả gợi ý vào state
      setRecommendations(response.data.recommendations);
    } catch (err) {
      // Xử lý lỗi nếu có

      console.error(err);
    }
  };

  const handleClick = (product) => {
    setRecommendations([]);
    navigate(`/thongtinchitietgiay/${product.MASP}`, { state: product });
  };

  console.log("recommendations", recommendations);
  return (
    <>
      {" "}
      <div className="navbar" id="navbar">
        <div color="light" light expand="md" className="nav">
          <div className="isOpen">
            <a className="image-navbar" href="/">
              QuanAo
            </a>
            <div className="ml-autoo" style={{ marginLeft: "13%" }}>
              <a
                href="/"
                className="nav-item nav-item1"
                style={{ width: "100px" }}
              >
                Giới Thiệu
              </a>
              <a href="/nu-sanpham" className="nav-item nav-item1">
                Nữ
              </a>
              <a href="/nam-sanpham" className="nav-item nav-item2">
                Nam
              </a>
              <a href="/tatca-sanpham" className="nav-item nav-item4">
                Tất Cả
              </a>{" "}
            </div>{" "}
            <div className="search-container " style={{ marginRight: "10%" }}>
              <input
                type="text"
                value={productName}
                onChange={handleInputChange} // Gọi hàm handleInputChange mỗi khi giá trị thay đổi
                placeholder="Tìm kiếm giày.."
                className="search-input"
              />
              {/* Hiển thị gợi ý sản phẩm nếu có */}
              <ul className="recommendations-list">
                {recommendations.length > 0 ? (
                  recommendations.map((product, index) => (
                    <li
                      key={index}
                      className="recommendation-item"
                      onClick={() => handleClick(product)}
                      style={{
                        cursor: "pointer",
                        padding: "8px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {product.TENSANPHAM}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div className="cart-divv">
              {isAuthenticated ? (
                <div className="user-info">
                  {" "}
                  <Stack spacing={2} direction="row">
                    <Badge
                      badgeContent={soLuongSanPham == 0 ? 0 : soLuongSanPham}
                      color="secondary"
                    >
                      <i
                        class="fa-solid fa-cart-shopping icon-cart"
                        onClick={handleShow}
                      ></i>
                    </Badge>
                  </Stack>
                  <span className="username">{username}</span>
                  <div className="nav-avatar" onClick={toggleDropdown}>
                    <img
                      className="nav-avatarUser"
                      src={
                        imgAvatar
                          ? `http://localhost:3003/images/${imgAvatar}`
                          : `${avat}`
                      }
                      alt="Avatar"
                    />{" "}
                  </div>{" "}
                  {isDropdownOpen ? (
                    <div className="dropdown-menu">
                      <button onClick={handleProfile} className="dropdown-item">
                        Hồ Sơ
                      </button>
                      <button onClick={handleLogout} className="dropdown-item">
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-dark nav-dangnhap"
                  onClick={handleLoginUser}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ShoppingCart
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </>
  );
};

export default MyNavbar;
