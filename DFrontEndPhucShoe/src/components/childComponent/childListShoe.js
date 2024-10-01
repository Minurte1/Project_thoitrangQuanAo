import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listShoe.css";
import { Modal, Button } from "react-bootstrap";
import { tokenSession } from "../../services/serviesTokenSessionStored";
import CookiesAxios from "../../services/CookiesAxios";
import { useCart } from "../../CartContext";
// React Component for rendering each shoe item
const ShoeItem = ({ shoe, navigate }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const handleAddCart = async () => {
    const username = await tokenSession();

    if (!username) {
      setShowModal(true);
    } else {
      try {
        const response = await CookiesAxios.post(
          "http://localhost:3003/api/v1/cart",
          { username: username, product: shoe }
        );
        console.log(response.data); // In ra phản hồi từ server
        if (response.data.EC === 1) {
          addToCart(username);
        }
      } catch (error) {
        console.error(
          "Lỗi khi thêm sản phẩm vào giỏ hàng:",
          error.response.data
        );
      }
    }
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login"); // Điều hướng sang trang đăng nhập
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng modal
  };

  // Làm tròn giá đến hai chữ số sau dấu thập phân
  const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
  const so = parseFloat(roundedPrice);
  const price = so.toLocaleString();

  return (
    <>
      <li key={shoe.MASP}>
        <div
          onClick={() =>
            navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe })
          }
        >
          <img
            src={`http://localhost:3003/images/${shoe.description}`}
            alt={shoe.TENSANPHAM}
          />
          <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
          <p>{price}đ</p>
        </div>

        <i
          onClick={handleAddCart}
          className="fa-solid fa-cart-plus  add-cart"
        ></i>
      </li>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn chưa đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn đăng nhập để tiếp tục không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Không
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// React Component for rendering the shoe list
export const ShoeList = ({ shoes }) => {
  const navigate = useNavigate();

  if (!shoes || !shoes.data || !Array.isArray(shoes.data)) {
    return <div>No valid Quần Áo data available</div>;
  }

  try {
    // Lọc danh sách giày nam và giày nữ từ dữ liệu shoes.data
    const maleShoes = shoes.data
      .filter((shoe) => String(shoe.MALOAI) === "15")
      .slice(0, 5);
    const femaleShoes = shoes.data
      .filter((shoe) => String(shoe.MALOAI) === "16")
      .slice(0, 5);

    // Kết hợp danh sách giày nam và giày nữ
    const combinedShoes = [...maleShoes, ...femaleShoes];

    return (
      <div className="shoe-list">
        <h2 className="tieude">Các Sản Phẩm Quần Áo</h2>
        <hr />
        <ul>
          {combinedShoes.map((shoe) => (
            <ShoeItem key={shoe.MASP} shoe={shoe} navigate={navigate} />
          ))}
        </ul>
        <hr />
      </div>
    );
  } catch (error) {
    console.error("Error rendering shoes:", error);
    return <div>Error rendering Quần Áo</div>;
  }
};
