import React from "react";
import "../assets/styles/FooterHomepage.css";

function Footer() {
  return (
    <>
      <div className="containerF">
        <div className="tieude_h2">
          {" "}
          <h2>Hệ Thống Cửa Hàng</h2>
        </div>

        <div className="container-footer">
          <div className="footer-logo">
            {" "}
            <a className="logo" href="/">
              Quần Áo
            </a>
          </div>

          <div className="footer-hr"></div>
          <div className="foolter">
            <div className="footer-thongtinlienhe">
              {" "}
              <p className="footer-thongtin2">Thông Tin Liên Hệ</p>
              <p className="footer-thongtinlienhe_diachi">Địa chỉ:</p>
              <p>Email: </p>
              <p>Hotline: </p>
            </div>
            <div className="footer-hr"></div>
            <div className="footer-chinhsach">
              {" "}
              <p className="footer-thongtin2">Chính Sách </p>
              <p className="footer-chinhsach_baohanh">Bảo hành 12 tháng</p>
              <p>Đổi trả sau 3 ngày </p>
              <p>Miễn ship cho lần đầu mua hàng</p>
            </div>
            <div className="footer-hr"></div>
            <div className="footer-hotro">
              <p className="footer-thongtin2">Hỗ Trợ </p>
              <p>
                <a href="/tuyendung" className="thea footer-hotro_tuyendung">
                  Tuyển dụng
                </a>
              </p>{" "}
            </div>
            <div className="footer-hr"></div>
            <div className="footer-mangxahoi">
              {" "}
              <p className="footer-thongtin2"> Mạng xã hội</p>
              <p>
                <a href="#" className="thea footer-facebook">
                  Facebook
                </a>
              </p>
              <p>
                <a href="#" className="thea">
                  Instagram
                </a>
              </p>
              <p>
                <a href="#" className="thea">
                  Tiktok
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
