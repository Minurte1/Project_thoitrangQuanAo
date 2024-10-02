import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css";
import { tokenSession } from "../../services/serviesTokenSessionStored";
import CookiesAxios from "../../services/CookiesAxios";
import { useCart } from "../../CartContext";
import { Modal, Button } from "react-bootstrap";

export const handleItemClick = (shoe, navigate) => {
  navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
  // Làm tròn giá đến hai chữ số sau dấu thập phân
  const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
  var so = parseFloat(roundedPrice);

  const price = so.toLocaleString();
  return (
    <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
      <img
        src={`http://localhost:3003/images/${shoe.description}`}
        alt={shoe.TENSANPHAM}
      />
      <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
      <p>{price}đ</p>
    </li>
  );
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
export const ChildSPNu = ({ shoes }) => {
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
      shoe.MALOAI === 18
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

  return (
    <div className="shoe-list">
      <h2 className="tieude" id="tieude_tatcasp">
        Sản Phẩm Nữ
      </h2>
      <div>
        <input
          className="input-timSP"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`button-sort ${sortOrder === "asc" ? "asc" : "desc"}`}
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sắp xếp theo giá {sortOrder === "asc" ? "tăng dần" : "giảm dần"}
        </button>
      </div>
      <div className="dropdown-container">
        <label className="label-price" htmlFor="priceFilter">
          Chọn giá:
        </label>
        <select
          id="priceFilter"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="select-price"
        >
          {["Tất cả", "Dưới 200k", "Dưới 300k", "Dưới 400k", "Dưới 500k"].map(
            (price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            )
          )}
        </select>
      </div>
      <hr></hr>
      <ul>
        {sortedShoes.map((shoe) => (
          <li key={shoe.MASP}>
            <img
              onClick={() => handleItemClick(shoe, navigate)}
              src={`http://localhost:3003/images/${shoe.description}`}
              alt={shoe.TENSANPHAM}
            />
            <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
            <p>{parseFloat(shoe.GIA).toLocaleString()}đ</p>{" "}
            <i
              onClick={() => handleAddCart(shoe, addToCart, setShowModal)}
              className="fa-solid fa-cart-plus add-cart"
            ></i>
          </li>
        ))}
      </ul>
      <hr></hr>{" "}
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
