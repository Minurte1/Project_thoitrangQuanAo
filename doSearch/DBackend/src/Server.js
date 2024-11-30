const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { exec } = require("child_process"); // Thêm phần này để gọi lệnh shell
require("dotenv").config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME || "0.0.0.0";
const corsOptions = {
  origin: true, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API cho "Hello World"
// app.use("/helloworld", (req, res) => {
//   res.send("Hello World");
// });

// API của bạn (ví dụ: apiRoute)
const apiRoute = require("../src/routers/api.js");
app.use("/api/v1/", apiRoute);

// Cấu hình template engine
const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

// Chạy server Express
app.listen(port, hostname, () => {
  console.log(`${hostname} Example app listening on port ${port}`);
});
