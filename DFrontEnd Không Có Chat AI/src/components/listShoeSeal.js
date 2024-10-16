import React from "react";
import { ShoeListSeal } from "../components/childComponent/childListSeal";
import axios from "axios";
import { useState, useEffect } from "react";

function ListShoeSeal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/v1/productall"
        );

        setData({
          data: response.data.DT,
          loading: false,
        });

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

  // console.log('checkdatalistSHOE', data);

  return (
    <div className="App">
      <ShoeListSeal shoes={data} />
    </div>
  );
}

export default ListShoeSeal;
