import axios from "axios";

// Tạo một instance của axios với cấu hình ban đầu
const SessionAxios = axios.create({
  withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu nếu cần
});

// Thêm interceptor để tự động thêm header Authorization vào tất cả các yêu cầu
SessionAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken"); // Lấy token từ sessionStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default SessionAxios;
