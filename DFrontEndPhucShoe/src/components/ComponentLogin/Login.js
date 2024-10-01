import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import Slide1 from "./assets/image/slide1.jpg";
const Login = () => {
  //   const registerBtn = document.getElementById("register");
  //   const container = document.getElementById("container");
  //   const loginBtn = document.getElementById("login");
  //   registerBtn.addEventListener("click", () => {
  //     container.classList.add("active");
  //   });
  //   registerBtn.addEventListener("click", () => {
  //     container.classList.add("active");
  //   });
  //   loginBtn.addEventListener("click", () => {
  //     container.classList.remove("active");
  //   });
  const navigate = useNavigate();

  const [UsernameLogin, setUsernameLogin] = useState("");
  const [PasswordLogin, setPasswordLogin] = useState("");
  const [UsernameRegister, setUsernameRegister] = useState("");
  const [PasswordRegister, setPasswordRegister] = useState("");
  const [RePasswordRegister, setRePasswordRegister] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra điều kiện đăng ký
      if (
        !UsernameRegister ||
        !RePasswordRegister ||
        PasswordRegister !== RePasswordRegister
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin đăng ký");
        return; // Thoát khỏi hàm nếu điều kiện không đúng
      }
      if (!emailRegex.test(UsernameRegister)) {
        toast.error("Vui lòng nhập đúng cú pháp email");
        return; // Thoát khỏi hàm nếu điều kiện không đúng
      }
      setIsActive(true);

      // Gửi yêu cầu đăng ký
      const response = await axios.post(
        "http://localhost:3003/api/v1/register",
        {
          username: UsernameRegister,
          password: PasswordRegister,
        }
      );

      // Xử lý phản hồi từ máy chủ
      if (response.data.EC === 1) {
        toast.success("Đăng ký thành công");
        setIsActive(false); // Đảm bảo trạng thái active được cập nhật
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Có lỗi xảy ra trong quá trình đăng ký");
    } finally {
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Kiểm tra điều kiện đăng nhập
      if (!UsernameLogin || !PasswordLogin) {
        toast.error("Vui lòng điền đầy đủ thông tin đăng nhập");
        return; // Thoát khỏi hàm nếu điều kiện không đúng
      }
      // if (!emailRegex.test(UsernameRegister)) {
      //   toast.error("Vui lòng nhập đúng cú pháp email");
      //   return; // Thoát khỏi hàm nếu điều kiện không đúng
      // }
      setIsActive(false);

      // Gửi yêu cầu đăng nhập
      const response = await axios.post("http://localhost:3003/api/v1/login", {
        username: UsernameLogin,
        password: PasswordLogin,
      });

      // Xử lý phản hồi từ máy chủ
      if (response.data.EC === 1) {
        sessionStorage.setItem("accessToken", response.data.DT.access_token);
        toast.success("Đăng nhập thành công");
        navigate(`/`);
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
    } finally {
      setIsActive(false); // Đảm bảo trạng thái active được cập nhật
    }
  };

  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className="container-login">
        <div
          className={"container1" + (isActive ? " active" : "")}
          id="container"
        >
          {" "}
          <div className="form-container sign-up">
            <form action="">
              {/* <h2>Create Account</h2> */}
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <span>Hãy đăng ký một tài khoản dành cho riêng bạn</span>
              <div className="couple-text">
                <input
                  type="text"
                  className="text-input"
                  onChange={(event) => setUsernameRegister(event.target.value)}
                />
                <div className="labelline"> Email</div>
              </div>

              <div className="couple-text">
                <input
                  type="password"
                  className="text-input"
                  name="password"
                  onChange={(event) => setPasswordRegister(event.target.value)}
                  autoComplete="on"
                />

                <div className="labelline"> Password</div>
              </div>
              <div className="couple-text">
                <input
                  type="password"
                  name="re-password"
                  className="text-input"
                  onChange={(event) =>
                    setRePasswordRegister(event.target.value)
                  }
                />
                <div className="labelline"> Re-Password</div>
              </div>
              <button className="btn-accept" onClick={handleRegister}>
                Đăng ký
              </button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form action="">
              {/* <h2>Sign in</h2> */}
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              {/* <span>or use your email for registeration</span> */}
              <span>Đăng nhập để sử dụng thêm nhiều thứ mới mẻ hơn</span>
              <div className="couple-text">
                <input
                  type="text"
                  className="text-input"
                  onChange={(event) => setUsernameLogin(event.target.value)}
                />
                <div className="labelline"> Email</div>
              </div>

              <div className="couple-text">
                <input
                  type="password"
                  className="text-input"
                  autoComplete="on"
                  name="password"
                  onChange={(event) => setPasswordLogin(event.target.value)}
                />
                <div className="labelline"> Password</div>
              </div>
              <a className="tag">forget your password ?</a>
              <button className="btn-accept" onClick={handleLogin}>
                Đăng nhập
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>HELLO, MY FRIEND !!</h1>
                {/* <p>
                  Register with your personal details to use all of site
                  features
                </p> */}
                <p>
                  Có một tài khoản trong tay bạn dễ dàng tạo nên thuận tiện mua
                  hàng
                </p>
                <button
                  className="hidden"
                  id="login"
                  onClick={handleLoginClick}
                >
                  {" "}
                  Đăng nhập
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1> WELCOME BACK</h1>
                <p>Đăng nhập để tạo nên sự liên kết giới bạn và mình</p>
                <button
                  className="hidden"
                  id="register"
                  onClick={handleRegisterClick}
                >
                  {" "}
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          {/* -------------------- */}
        </div>
      </div>{" "}
    </>
  );
};

export default Login;
