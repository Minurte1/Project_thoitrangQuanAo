import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css";
import "../childComponent/listShoeSeal.css";
export const handleItemClick = (shoe, navigate) => {
  navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
  // console.log('Rendering shoe item:', shoe);

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

export const ShoeListSeal = ({ shoes }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");

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
      shoe.MALOAI === 16
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
        Sản Phẩm Quần Áo Dành Cho Nữ
      </h2>

      <hr className="hrne"></hr>
      <ul>
        {limitedShoes.map((shoe) => (
          <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
            <img
              src={`http://localhost:3003/images/${shoe.description}`}
              alt={shoe.TENSANPHAM}
            />
            <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
            <p>{parseFloat(shoe.GIA).toLocaleString()}đ</p>
          </li>
        ))}
      </ul>
      <hr></hr>
    </div>
  );
};
