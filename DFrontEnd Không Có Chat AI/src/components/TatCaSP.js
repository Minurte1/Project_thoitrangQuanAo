import React from "react";
import { AllShoeList } from "../components/childComponent/chillTatCaSP";
import axios from "axios";
import { useState, useEffect } from "react";

function ListShoe() {
  const [data, setData] = useState(null);
  const [hang, setHang] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/v1/productall"
        );
        const response_hang = await axios.get(
          "http://localhost:3003/api/v1/hang"
        );
        setData({
          data: response.data.DT,
          loading: false,
        });
        setHang(response_hang.data.DT);

        // console.log(response.data);
      } catch (error) {
        console.error(error.message);
        setData({
          error: error.message,
          loading: false,
        });
      }
    };

    fetchData();
  }, []);

  // console.log("checkdatalistSHOE", data);

  return (
    <div className="App">
      <AllShoeList shoes={data} hang={hang} />
    </div>
  );
}

export default ListShoe;
