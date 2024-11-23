import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ForgetPassword.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); // To handle the OTP stage
  const [enteredOtp, setEnteredOtp] = useState(""); // OTP input field
  const [isOtpVerified, setIsOtpVerified] = useState(false); // To switch to password reset form
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Function to send OTP to email
  const sendOtp = async () => {
    if (loading === true) {
      toast.warn("Đang gửi...");
      return;
    }
    if (email === "") {
      toast.error("Email Invalid");
    } else {
      setLoading(true);

      let code = "";
      for (let i = 0; i < 6; i += 1) {
        code += Math.floor(Math.random() * 10).toString();
      }

      setOtp(parseInt(code)); // Save OTP in state for later verification

      const data = {
        emailTo: email,
        template: "Mã Xác Nhận: " + code,
      };

      try {
        const response = await axios.post(
          "http://emailserivce.somee.com/Email/sendMail",
          data
        );
        setLoading(false);
        toast.success("OTP Sent to Your Email");
        setIsOtpSent(true); // Show OTP input field after email is sent
      } catch (error) {
        toast.error("Failed to send OTP");
      }
    }
  };

  // Function to verify OTP
  const verifyOtp = () => {
    if (parseInt(enteredOtp) === otp) {
      toast.success("OTP Verified");
      setIsOtpVerified(true); // Switch to the reset password form
    } else {
      toast.error("Invalid OTP");
    }
  };

  // Function to reset the password
  const resetPassword = async () => {
    if (newPassword === "" || confirmPassword === "") {
      toast.error("Please fill out both fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      console.log("email", email);
      try {
        const response = await axios.put(
          `http://localhost:3003/api/v1/user/info/update/password/be/${email}`,
          { password: newPassword }
        );

        if (response.data.EC === 1) {
          toast.success("Password Reset Successfully");
          navigate("/login");
        }
        // Optionally, redirect the user to the login page or another route
      } catch (error) {
        console.log(error);
        toast.error("Failed to reset password");
      }
    }
  };

  return (
    <div className="password-reset-container container">
      {!isOtpSent ? (
        <div className="form-group">
          {" "}
          <h3>Quên mật khẩu</h3>
          <p className="forget-password-p">
            Vui lòng nhập email mà bạn đã đăng nhập vào hệ thống
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field"
          />
          <button
            className="btn-primary"
            onClick={sendOtp}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span> Send OTP </span>
            {loading && (
              <Stack
                sx={{ color: "grey.500", marginLeft: "8px" }}
                spacing={2}
                direction="row"
              >
                <CircularProgress sx={{ color: "#ffffff" }} size={17} />{" "}
                {/* Thay đổi màu tại đây */}
              </Stack>
            )}
          </button>
        </div>
      ) : !isOtpVerified ? (
        <div className="form-group">
          {" "}
          <h3>Xác nhận Email</h3>
          <p className="forget-password-p">
            Vui lòng kiểm tra email của bạn và nhập vào hệ thống
          </p>
          <input
            type="text"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            placeholder="Enter OTP"
            className="input-field"
          />
          <button className="btn-primary" onClick={verifyOtp}>
            Verify OTP
          </button>
        </div>
      ) : (
        <div className="form-group">
          <h3>Thay đổi mật khẩu</h3>
          <p className="forget-password-p">
            Vui lòng nhập lại mật khẩu mới để đăng nhập vào hệ thống
          </p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="input-field"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="input-field"
          />
          <button className="btn-primary" onClick={resetPassword}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordComponent;
