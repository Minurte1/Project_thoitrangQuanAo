import React from "react";
import { ChildSPNam } from "../components/childComponent/childSpNam";
import axios from "axios";
import { useState, useEffect } from "react";

function ListSpNu() {
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
      <ChildSPNam shoes={data} hang={hang} />
    </div>
  );
}

export default ListSpNu;