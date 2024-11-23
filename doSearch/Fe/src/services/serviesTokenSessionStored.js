import { jwtDecode } from "jwt-decode";

export const tokenSession = () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    console.error("Token không tồn tại.");
    return null; // Trả về null nếu không có token
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.taikhoan);
    return decoded.taikhoan;
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null; // Trả về null nếu token không hợp lệ
  }
};
