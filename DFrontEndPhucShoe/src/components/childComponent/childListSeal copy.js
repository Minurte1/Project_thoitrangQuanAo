import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css";
import "../childComponent/listShoeSeal.css";
import { tokenSession } from "../../services/serviesTokenSessionStored";
import CookiesAxios from "../../services/CookiesAxios";
import { useCart } from "../../CartContext";
import { Modal, Button } from "react-bootstrap";

export const handleItemClick = (shoe, navigate) => {
  navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const handleAddCart = async (shoe, addToCart, setShowModal) => {
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
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.response.data);
    }
  }
};

export const renderShoeItem = (shoe, navigate, addToCart, setShowModal) => {
  const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
  var so = parseFloat(roundedPrice);
  const price = so.toLocaleString();

  return (
    <li key={shoe.MASP}>
      <img
        src={`http://localhost:3003/images/${shoe.description}`}
        alt={shoe.TENSANPHAM}
      />
      <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
      <p>{price}đ</p>
      <i
        onClick={() => handleAddCart(shoe, addToCart, setShowModal)}
        className="fa-solid fa-cart-plus add-cart"
      ></i>
    </li>
  );
};

export const ShoeListSealNam = ({ shoes }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const checkPriceRange = (price) => {
    const numericPrice = parseFloat(price);

    switch (selectedPriceRange) {
      case "Dưới 200k":
        return numericPrice < 200000;
      case "Dưới 300k":
        return numericPrice < 300000;
      case "Dưới 400k":
        return numericPrice < 400000;
      case "Dưới 500k":
        return numericPrice < 500000;
      default:
        return true;
    }
  };

  if (
    !shoes ||
    !shoes.data ||
    !Array.isArray(shoes.data) ||
    shoes.data.length === 0
  ) {
    return <div>No shoes available</div>;
  }

  const filteredShoes = shoes.data.filter(
    (shoe) =>
      shoe.TENSANPHAM.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "" || shoe.TENHANG === selectedBrand) &&
      (selectedPriceRange === "Tất cả" || checkPriceRange(shoe.GIA)) &&
      shoe.MALOAI === 15
  );

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    const priceA = parseFloat(a.GIA);
    const priceB = parseFloat(b.GIA);

    if (sortOrder === "asc") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  const uniqueBrands = [...new Set(shoes.data.map((shoe) => shoe.TENHANG))];
  const limitedShoes = sortedShoes.slice(0, 10);

  return (
    <div className="shoe-list shoe-listindex">
      <h2 className="tieude" id="tieude_tatcasp">
        Sản Phẩm Quần Áo Dành Cho Nam
      </h2>

      <hr className="hrne"></hr>
      <ul>
        {limitedShoes.map((shoe) =>
          renderShoeItem(shoe, navigate, addToCart, setShowModal)
        )}
      </ul>
      <hr></hr>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn chưa đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn đăng nhập để tiếp tục không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Không
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              navigate("/login");
            }}
          >
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
