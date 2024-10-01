import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../../components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import axios from "axios";
import bag from "../../../../public/assets/icons/glass/ic_glass_bag.png";
import buy from "../../../../public/assets/icons/glass/ic_glass_buy.png";
import shoes from "../../../../public/assets/icons/glass/clothes.png";
import user from "../../../../public/assets/icons/glass/ic_glass_users.png";

// ----------------------------------------------------------------------

function AppView() {
  const currentDate = new Date();
  const [Thongke, setThongke] = useState("");
  const [SoTien, setThongKeTien] = useState("");
  const [Tongsodonhang, setThongKeTongSoDonHang] = useState("");
  const [TongsoGiay, setTongsoGiay] = useState("");
  const [TongSoCacHangBanDuoc, setTongSoCacHangBanDuoc] = useState(null);
  const [TongSoLuongUser, setTongSoLuongUser] = useState(null);
  const [TongSoCacHangBanDuoctheonam, setTongSoCacHangBanDuoctheonam] =
    useState(null);
  const [TongSoCacLoaiGiayBanDuoc, setTongSoCacLoaiGiayBanDuoc] =
    useState(null);
  const [currentMonth, setcurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());

  const [bestSellingProductOfMonth, setbestSellingProductOfMonth] =
    useState(null);

  const [CountUser, setCountUser] = useState(null);
  useEffect(() => {
    fetchData();
    fetchDataTAA();
    fetchDataTAA3A();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/v1/productThongke"
      );
      setThongke(response.data.DT);
      console.log(response.data.DT);
      setThongKeTien(response.data.DT.results[0].TotalPrice);
      setThongKeTongSoDonHang(response.data.DT.results1[0].Totalsoluongdonhang);
      setTongsoGiay(response.data.DT.results2[0].Totalsoluongsanpham);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataTAA = async () => {
    try {
      // Gửi tất cả các yêu cầu song song
      const [responseUser, response1, response2, response3, response4] =
        await Promise.all([
          axios.get("http://localhost:3003/api/v1/countuser"),
          axios.get("http://localhost:3003/api/v1/productall/hang"),
          axios.get("http://localhost:3003/api/v1/productall/loai"),
          axios.post("http://localhost:3003/api/v1/productall/thang", {
            nam: currentYear,
            thang: currentMonth,
          }),
          axios.get("http://localhost:3003/api/v1/productall/nam"),
        ]);

      // Cập nhật state với dữ liệu nhận được
      setTongSoLuongUser(responseUser.data);
      setTongSoCacHangBanDuoc(response1.data.DT);
      setTongSoCacLoaiGiayBanDuoc(response2.data.DT);
      setbestSellingProductOfMonth(response3.data.DT);
      setTongSoCacHangBanDuoctheonam(response4.data.DT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTAA3A = async () => {
    try {
      const responseUser = await axios.get(
        "http://localhost:3003/api/v1/countuser"
      );
      setTongSoLuongUser(responseUser.data.DT[0].totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(TongSoCacHangBanDuoctheonam);
  if (
    !TongSoCacHangBanDuoc ||
    !TongSoCacLoaiGiayBanDuoc ||
    !bestSellingProductOfMonth ||
    !TongSoCacHangBanDuoctheonam
  ) {
    return <div>Loading...</div>;
  }
  const series = TongSoCacHangBanDuoc.map((item) => ({
    label: item.Hang,
    value: item.TongSoSanPhamDaBan,
  }));
  const seriesXuHuong = TongSoCacLoaiGiayBanDuoc.map((item) => ({
    label: item.Loai,
    value: item.TongSoSanPhamDaBan,
  }));
  const seriesBestProductSelling = bestSellingProductOfMonth.map((item) => ({
    label: item.TenSanPham,
    value: item.TongSoSanPhamDaBan,
  }));

  const soluongdonhangtheonam = TongSoCacHangBanDuoctheonam.map(
    (item, index) => ({
      label: item.Nam,
      value: item.Thang,
    })
  );
  const soluongtongdonhangtheonam = TongSoCacHangBanDuoctheonam.map(
    (item, index) => ({
      label: item.SoLuongDonHang,
      value: item.TongTien,
    })
  );
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số tiền bán được"
            total={SoTien}
            color="success"
            icon={<img alt="icon" src={bag} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng khách hàng đăng ký"
            total={TongSoLuongUser}
            color="info"
            icon={<img alt="icon" src={user} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số tất cả đơn hàng"
            total={Tongsodonhang}
            color="warning"
            icon={<img alt="icon" src={buy} />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số lượng sản phẩm"
            total={TongsoGiay}
            color="error"
            icon={<img alt="icon" src={shoes} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Tổng số đơn hàng bán được theo năm"
            // subheader="(+43%) than last year"
            chart={{
              labels: soluongdonhangtheonam.map(
                (item) => `${item.label} ${item.value}`
              ),
              series: [
                {
                  name: "Doanh thu",
                  type: "column",
                  fill: "solid",
                  data: soluongtongdonhangtheonam.map(
                    (item) => `${item.value}`
                  ),
                },

                // {
                //   name: "Team C",
                //   type: "line",
                //   fill: "solid",
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
          ;
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ khách hàng mua đồ theo các hãng"
            chart={{
              series: series,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Tổng số đơn hàng bán được theo năm"
            // subheader="(+43%) than last year"
            chart={{
              labels: soluongdonhangtheonam.map(
                (item) => `${item.label} ${item.value}`
              ),
              series: [
                {
                  name: "Đơn hàng",
                  type: "area",
                  fill: "gradient",
                  data: soluongtongdonhangtheonam.map(
                    (item) => `${item.label}`
                  ),
                },
                // {
                //   name: "Team C",
                //   type: "line",
                //   fill: "solid",
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
          ;
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Xu hướng mua đồ của khách hàng"
            chart={{
              series: seriesXuHuong,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppView;
