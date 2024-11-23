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
const { spawnSync } = require("child_process");

app.use("/start-python", (req, res) => {
  console.log("Received request to start Python server...");

  let scriptPath = path.resolve(__dirname, "main.py");
  console.log("Script Path:", scriptPath);

  const pythonProcess = spawnSync("python", [scriptPath], {
    encoding: "utf-8",
    stdio: "pipe",
  });
  console.log("pythonProcess", pythonProcess);
  if (pythonProcess.error) {
    console.error("Error:", pythonProcess.error);
    return res.status(500).send("Không thể khởi động server Python");
  }

  if (pythonProcess.stdout) {
    console.log("Python script output:", pythonProcess.stdout.toString());
  }
  if (pythonProcess.stderr) {
    console.error(
      "Python script error output:",
      pythonProcess.stderr.toString()
    );
    return res.status(500).send("Lỗi khi chạy script Python");
  }

  res.send("Server Python đã được khởi động");
});

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
