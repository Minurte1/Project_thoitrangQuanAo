-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tmdtquanao
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (9990,2148,'2024-10-02 23:00:33','ChuaGiao','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9992,2148,'2024-10-02 23:07:12','Đã Giao Thành Công','ádasdasd','12,  ádasd,  ádasd,  ádasd','0327434222',NULL),(9995,2148,'2024-10-02 23:47:00','Đã Giao Thành Công','ádasdasd',' xã  ádasd, huyện  ádasd, tỉnh  ádasd','0327434222',NULL),(10002,931,'2024-10-26 16:32:45','ChuaGiao','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL),(10003,931,'2024-10-26 16:37:10','Đã Giao Thành Công','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL),(10004,931,'2024-10-27 12:45:24','Đã Hủy','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL),(10005,931,'2024-10-27 12:48:20','ChuaGiao','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL),(10006,931,'2024-10-27 12:57:31','ChuaGiao','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-27 13:04:36
