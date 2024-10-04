-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: TMDTQuanAo
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','$2b$10$qKW4LIXDHJK5E5b2YHJVneSUJJqOQ9/7Wqj7nL/CETBXnkhYFx4DS');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `MADONHANG` int NOT NULL,
  `MASP` int NOT NULL,
  `SOLUONG` int NOT NULL,
  `THANHTIEN` decimal(10,2) NOT NULL,
  `TRANGTHAI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SIZE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MADONHANG`,`MASP`),
  KEY `MASP` (`MASP`),
  CONSTRAINT `CHITIETDONHANG_ibfk_1` FOREIGN KEY (`MADONHANG`) REFERENCES `donhang` (`MADONHANG`),
  CONSTRAINT `CHITIETDONHANG_ibfk_2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (727,104,1,31212.00,'ChuaGiao',NULL),(801,104,1,31212.00,'ChuaGiao','M'),(2528,104,1,31212.00,'ChuaGiao',NULL),(5711,104,1,31212.00,'ChuaGiao',NULL),(8804,104,1,31212.00,'ChuaGiao',NULL),(8909,103,1,31111.00,'ChuaGiao',NULL),(9987,103,11,4444.00,'ChuaGiao',NULL),(9988,103,11,3333.00,'ChuaGiao',NULL),(9988,104,12,3636.00,'ChuaGiao',NULL),(9989,104,12,0.00,'ChuaGiao',NULL),(9991,104,12,1212.00,'ChuaGiao',NULL),(9992,104,12,4848.00,'ChuaGiao',NULL),(9993,103,11,2222.00,'ChuaGiao',NULL),(9994,103,11,2222.00,'ChuaGiao',NULL),(9994,104,12,2424.00,'ChuaGiao',NULL),(9995,103,11,3333.00,'ChuaGiao',NULL),(9995,104,12,3636.00,'ChuaGiao',NULL);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MADONHANG` int NOT NULL AUTO_INCREMENT,
  `MAKHACHHANG` int DEFAULT NULL,
  `NGAYDONHANG` datetime DEFAULT NULL,
  `TRANGTHAI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ChuaGiao',
  `ten` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diachi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sodienthoai` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ghichu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MADONHANG`),
  KEY `MAKHACHHANG` (`MAKHACHHANG`),
  CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`MAKHACHHANG`) REFERENCES `khachhang` (`MAKHACHHANG`)
) ENGINE=InnoDB AUTO_INCREMENT=9996 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (727,2148,'2024-10-03 20:13:43','ChuaGiao','Hồ Hoàng Phúc',' xã  a, huyện  a, tỉnh  a','0327434222',NULL),(801,2148,'2024-10-03 20:17:11','ChuaGiao','Hồ Hoàng Phúc',' xã  a, huyện  a, tỉnh  a','0327434222',NULL),(2528,2148,'2024-10-03 20:04:19','ChuaGiao','Hồ Hoàng Phúc',' xã  a, huyện  a, tỉnh  a','0327434222',NULL),(5711,2148,'2024-10-03 20:05:55','ChuaGiao','Hồ Hoàng Phúc',' xã undefined, huyện undefined, tỉnh undefined','0327434222',NULL),(8804,2148,'2024-10-03 20:07:04','ChuaGiao','Hồ Hoàng Phúc',' xã  a, huyện  a, tỉnh  a','0327434222',NULL),(8909,2148,'2024-10-02 21:39:08','ChuaGiao','ádasdaaaaaaaaaaaaaa','12, xã ádasd, huyện ádasd, tỉnh ádasd','0327434822','2asdasd'),(9987,2148,'2024-10-02 21:35:44','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9988,2148,'2024-10-02 21:46:49','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9989,2148,'2024-10-02 22:05:55','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9990,2148,'2024-10-02 23:00:33','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9991,2148,'2024-10-02 23:02:05','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9992,2148,'2024-10-02 23:07:12','Đã Giao Thành Công','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9993,2148,'2024-10-02 23:07:56','Đã Hủy','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9994,2148,'2024-10-02 23:45:48','Đã Hủy','ádasdasd',' xã  ádasd, huyện  ádasd, tỉnh  ádasd','0327434222',NULL),(9995,2148,'2024-10-02 23:47:00','Đã Giao Thành Công','ádasdasd',' xã  ádasd, huyện  ádasd, tỉnh  ádasd','0327434222',NULL);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang` (
  `ma_gio_hang` int NOT NULL AUTO_INCREMENT,
  `MASP` int DEFAULT NULL,
  `MAKHACHHANG` int DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `tong_tien` float DEFAULT NULL,
  PRIMARY KEY (`ma_gio_hang`),
  KEY `MAKHACHHANG` (`MAKHACHHANG`),
  KEY `MASP` (`MASP`),
  CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`MAKHACHHANG`) REFERENCES `khachhang` (`MAKHACHHANG`),
  CONSTRAINT `gio_hang_ibfk_2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (126,103,2148,2,2222),(127,104,2148,2,2424);
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang`
--

DROP TABLE IF EXISTS `hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hang` (
  `MAHANG` int NOT NULL AUTO_INCREMENT,
  `TENHANG` varchar(255) NOT NULL,
  PRIMARY KEY (`MAHANG`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang`
--

LOCK TABLES `hang` WRITE;
/*!40000 ALTER TABLE `hang` DISABLE KEYS */;
INSERT INTO `hang` VALUES (10,'ASS'),(18,'ABC');
/*!40000 ALTER TABLE `hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MAKHACHHANG` int NOT NULL AUTO_INCREMENT,
  `TEN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIACHI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GHICHU` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SODIENTHOAI` varchar(20) DEFAULT NULL,
  `taikhoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` text,
  PRIMARY KEY (`MAKHACHHANG`),
  KEY `taikhoan` (`taikhoan`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`taikhoan`) REFERENCES `users` (`taikhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=9908 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1658,NULL,NULL,NULL,NULL,'phuc@gmail.com',NULL),(2148,'Hồ Hoàng Phúc','12,  a,  a,  a',NULL,'0327434222','hohoangphucjob@gmail.com','image-1727879611102.png');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kichco`
--

DROP TABLE IF EXISTS `kichco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kichco` (
  `MAGIATRI` int NOT NULL AUTO_INCREMENT,
  `GIATRI` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`MAGIATRI`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kichco`
--

LOCK TABLES `kichco` WRITE;
/*!40000 ALTER TABLE `kichco` DISABLE KEYS */;
INSERT INTO `kichco` VALUES (44,'12'),(45,'M'),(46,'L');
/*!40000 ALTER TABLE `kichco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai` (
  `MALOAI` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MALOAI`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
INSERT INTO `loai` VALUES (18,'Nữ'),(19,'Nam');
/*!40000 ALTER TABLE `loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MASP` int NOT NULL AUTO_INCREMENT,
  `TENSANPHAM` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MAHANG` int NOT NULL,
  `GIA` decimal(10,2) NOT NULL,
  `giamgia` int DEFAULT NULL,
  `description` text,
  `MALOAI` int DEFAULT NULL,
  `MAGIATRI` int NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  `THONGTINSANPHAM` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`MASP`),
  KEY `SANPHAM_ibfk_1` (`MALOAI`),
  KEY `SANPHAM_ibfk_2` (`MAHANG`),
  KEY `SANPHAM_ibfk_4` (`MAGIATRI`),
  CONSTRAINT `SANPHAM_ibfk_2` FOREIGN KEY (`MAHANG`) REFERENCES `hang` (`MAHANG`),
  CONSTRAINT `SANPHAM_ibfk_3` FOREIGN KEY (`MALOAI`) REFERENCES `loai` (`MALOAI`),
  CONSTRAINT `SANPHAM_ibfk_4` FOREIGN KEY (`MAGIATRI`) REFERENCES `kichco` (`MAGIATRI`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (103,'ACC',10,1111.00,NULL,'image-1727879491130.jpg',18,44,11,'ádasdasd'),(104,'ád',18,1212.00,NULL,'image-1727880110565.png',18,44,12,'ádasd');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `taikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`taikhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('hohoangphucjob@gmail.com','$2b$10$QEEQ.c4mpmTzM3avRlCH8O.GtxlfLOHdx.q6az0IUm1SqyTzxJwo6'),('phuc@gmail.com','$2b$10$Sy.JDPpczJ9sREBH6i26LuBV/t6AuM50T/3rJjGwzRG.bJ3H/j862');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'TMDTQuanAo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-04 14:35:26
