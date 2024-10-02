const express = require("express");
//import express from 'express'
const app = express();
const cors = require("cors");

require("dotenv").config();
const path = require("path");
const port = process.env.PORT;

const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routers/web.js");
const connection = require("./config/database");

const bodyParser = require("body-parser");
const apiRoute = require("../src/routers/api.js");
const apiFront = require("../src/routers/apiFront.js");
const checkUserJWT = require("../src/middleware/JWTaction.js");
const cookieParser = require("cookie-parser");

const hostname = process.env.HOST_NAME || "0.0.0.0";
const corsOptions = {
  origin: true, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};
app.use(cors(corsOptions));
app.use(cookieParser());
//config template engine

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/helloworld", (req, res) => {
  res.send("hellowork");
});
app.use("/api/v1", apiFront);
app.use("/api/v1/", apiRoute);
configViewEngine(app);

app.use(webRouter);

//express default
app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
