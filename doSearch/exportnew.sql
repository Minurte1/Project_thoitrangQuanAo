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
INSERT INTO `chitietdonhang` VALUES (10012,115,1,200000.00,'ChuaGiao',NULL),(10012,143,1,150000.00,'ChuaGiao',NULL),(10013,143,1,150000.00,'ChuaGiao',NULL),(10015,113,2,700000.00,'ChuaGiao',NULL),(10015,128,1,360000.00,'ChuaGiao',NULL),(10016,117,1,310000.00,'ChuaGiao',NULL),(10016,120,1,380000.00,'ChuaGiao',NULL),(10017,116,1,280000.00,'ChuaGiao',NULL),(10017,119,1,280000.00,'ChuaGiao',NULL),(10017,126,1,290000.00,'ChuaGiao',NULL),(10017,129,1,150000.00,'ChuaGiao',NULL),(10017,143,1,150000.00,'ChuaGiao',NULL),(10018,128,1,360000.00,'ChuaGiao',NULL),(10018,144,1,230000.00,'ChuaGiao',NULL),(10019,119,1,280000.00,'ChuaGiao',NULL),(10019,122,1,160000.00,'ChuaGiao',NULL),(10020,114,1,300000.00,'ChuaGiao',NULL),(10020,133,1,310000.00,'ChuaGiao',NULL),(10020,136,1,280000.00,'ChuaGiao',NULL),(10021,111,1,200000.00,'ChuaGiao',NULL),(10021,115,1,200000.00,'ChuaGiao',NULL),(10021,123,1,260000.00,'ChuaGiao',NULL),(10021,127,1,260000.00,'ChuaGiao',NULL),(10022,124,1,410000.00,'ChuaGiao',NULL),(10022,125,1,310000.00,'ChuaGiao',NULL),(10022,126,1,290000.00,'ChuaGiao',NULL),(10022,143,1,150000.00,'ChuaGiao',NULL),(10022,144,1,230000.00,'ChuaGiao',NULL),(10023,124,1,410000.00,'ChuaGiao',NULL);
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
  `phuongthucthanhtoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MADONHANG`),
  KEY `MAKHACHHANG` (`MAKHACHHANG`),
  CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`MAKHACHHANG`) REFERENCES `khachhang` (`MAKHACHHANG`)
) ENGINE=InnoDB AUTO_INCREMENT=10024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (2051,3583,'2024-10-27 14:00:18','ChuaGiao','dfsdf','1, xã hohoangphucjob@gmail.com, huyện hohoangphucjob@gmail.com, tỉnh hohoangphucjob@gmail.com','0327434821','1','Offline'),(10012,931,'2024-10-27 14:37:58','Đã Giao Thành Công','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL,'Online'),(10013,931,'2024-10-27 14:41:49','Đã Giao Thành Công','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616',NULL,'Offline'),(10015,931,'2024-10-27 14:49:04','Đã Giao Thành Công','Tuấn anh',' xã  đông hiếu, huyện  thái hòa, tỉnh  nghệ an','0968575616','','Offline'),(10016,903,'2024-10-27 14:51:27','Đã Giao Thành Công','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404','SCB-88547','Online'),(10017,903,'2024-10-27 14:52:05','ChuaGiao','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404',NULL,'Offline'),(10018,903,'2024-10-27 14:52:44','Đã Giao Thành Công','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404','','Offline'),(10019,903,'2024-10-27 14:53:15','ChuaGiao','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404','MB-1578','Online'),(10020,903,'2024-10-27 14:54:29','Đã Giao Thành Công','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404','SHB-2651222','Online'),(10021,903,'2024-10-28 09:21:01','Đã Giao Thành Công','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404',NULL,'Online'),(10022,903,'2024-11-16 08:54:13','ChuaGiao','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404',NULL,'Online'),(10023,903,'2024-11-22 22:20:04','ChuaGiao','anh123',' xã  37 lê thanh nghị, huyện  Quận hai bà trưng, tỉnh  Ha nội','0968965404',NULL,'Online');
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
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang`
--

LOCK TABLES `hang` WRITE;
/*!40000 ALTER TABLE `hang` DISABLE KEYS */;
INSERT INTO `hang` VALUES (19,'Louis Vuitton'),(20,'Gucci'),(21,'Chanel'),(22,'Dior'),(28,'Burberry');
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
) ENGINE=InnoDB AUTO_INCREMENT=9991 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (384,NULL,NULL,NULL,NULL,NULL,NULL),(903,'anh123','185,  37 lê thanh nghị,  Quận hai bà trưng,  Ha nội',NULL,'0968965404','tuananhanh0401@gmail.com',NULL),(931,'Tuấn anh','cầu làng mẹ,  đông hiếu,  thái hòa,  nghệ an',NULL,'0968575616','quocanhanh1204@gmail.com',NULL),(957,NULL,NULL,NULL,NULL,'hi@gmail.com',NULL),(1593,'do quoc tuan anh',NULL,NULL,'0968575616','tuananhanh1204@gmail.com',NULL),(1658,NULL,NULL,NULL,NULL,'phuc@gmail.com',NULL),(1840,NULL,NULL,NULL,NULL,'tuananh2001@gmail.com',NULL),(2148,'Hồ Hoàng Phúc','12,  a,  a,  a',NULL,'0327434222','hohoangphucjob@gmail.com','image-1727879611102.png'),(3583,NULL,NULL,NULL,NULL,NULL,NULL),(5318,NULL,NULL,NULL,NULL,NULL,NULL),(5790,NULL,NULL,NULL,NULL,NULL,NULL),(6695,NULL,NULL,NULL,NULL,NULL,NULL),(7614,NULL,NULL,NULL,NULL,NULL,NULL),(7768,NULL,NULL,NULL,NULL,NULL,NULL),(7840,NULL,NULL,NULL,NULL,NULL,NULL),(7865,NULL,NULL,NULL,NULL,NULL,NULL),(7935,NULL,NULL,NULL,NULL,NULL,NULL),(9416,NULL,NULL,NULL,NULL,NULL,NULL),(9824,NULL,NULL,NULL,NULL,NULL,NULL),(9990,NULL,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kichco`
--

LOCK TABLES `kichco` WRITE;
/*!40000 ALTER TABLE `kichco` DISABLE KEYS */;
INSERT INTO `kichco` VALUES (45,'M'),(46,'L'),(47,'S'),(48,'Xl'),(50,'XXL');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (105,'Áo thun gucci',20,300000.00,NULL,'image-1728574601427.jpg',19,45,9,'đẹp thoáng mát'),(106,'Chanel áo phông',21,400000.00,NULL,'image-1729907596165.jpg',19,46,8,'Áo phông thoáng mát Chanel'),(107,'Áo chanel',21,299000.00,NULL,'image-1729907696899.jpg',18,47,10,'Đẹp chất liệu dễ chịu'),(108,'Quần Dior',22,250000.00,NULL,'image-1729907919098.jpg',18,47,10,'Đẹp'),(109,'Dior váy',22,299000.00,NULL,'image-1729907967488.jpg',18,48,10,'Đẹp tốt'),(110,'Áo Louis Vuitton',19,400000.00,NULL,'image-1729908138932.jpg',19,47,5,'Chính hãng'),(111,'Áo Burberry',28,200000.00,NULL,'image-1729908251012.jpg',19,45,10,'Đẹp'),(112,'ABC',20,99.00,NULL,'image-1729911384617.jpg',18,46,11,'ádfa'),(113,'Áo Louis Vuitton new',19,350000.00,NULL,'image-1729911582518.jpg',19,47,9,'Đẹp'),(114,'Áo chanel',21,300000.00,NULL,'image-1729911764718.jpg',18,47,10,'Đẹp'),(115,'Dior Luminous Blazer',22,200000.00,NULL,'image-1729930258814.jpg',19,48,10,'Áo khoác blazer sang trọng với chất liệu óng ánh, nổi bật'),(116,'Dior Étoile Gown',22,280000.00,NULL,'image-1729930325733.jpg',19,46,9,'Mang cảm hứng từ các vì sao, nhẹ nhàng và lấp lánh'),(117,'Dior Velours Royale',22,310000.00,NULL,'image-1729930419746.jpg',19,47,10,'Nét quý phái và quyền lực'),(118,'Dior Fleur de Satin',22,350000.00,NULL,'image-1729930477632.jpg',19,48,15,'Áo lụa mềm mại với họa tiết hoa, phù hợp cho mùa xuân'),(119,'Louis Vuitton Chic Horizon',19,280000.00,NULL,'image-1729930585660.jpg',19,48,10,'Mang cảm hứng từ bầu trời và đường chân trời'),(120,'Louis Vuitton Elegance en Noir',19,380000.00,NULL,'image-1729930638188.jpg',19,47,11,'Huyền bí, dành cho những dịp trang trọng'),(121,'Louis Vuitton Parisian Trench',19,320000.00,NULL,'image-1729930707951.jpg',19,48,10,'Phong cách cổ điển, đặc trưng của thời trang'),(122,'Gucci Nuit d\'Or',20,160000.00,NULL,'image-1729930781066.jpg',19,46,10,'Mang sắc vàng óng ánh của đêm tiệc, rất sang trọng'),(123,'Gucci Serenité',20,260000.00,NULL,'image-1729930827527.jpg',19,45,12,'Mang phong cách thoải mái, nhấn mạnh vào sự thanh bình'),(124,'Chanel Charme Mystique',21,410000.00,NULL,'image-1729931072380.jpg',19,47,9,'Trang phục có phong cách huyền bí, thường là tông màu tối với các chi tiết tinh tế'),(125,'Chanel Opale Dress',21,310000.00,NULL,'image-1729931114932.jpg',19,46,10,'Lấy cảm hứng từ đá quý Opal, với các màu sắc thay đổi tùy góc nhìn'),(126,'Chanel Ciel d’Hiver',21,290000.00,NULL,'image-1729931178738.jpg',19,48,12,'Phong cách huyền bí'),(127,'Burberry Monarch Cape',28,260000.00,NULL,'image-1729931255850.jpg',19,46,14,'Hoàng gia'),(128,'Burberry Élégance du Soir',28,360000.00,NULL,'image-1729931301057.jpg',19,45,10,'Sang trọng và tinh tế.'),(129,'Váy Louis Vuitton',19,150000.00,NULL,'image-1729931712062.jpg',18,46,15,'Phong cách yêu kiều, quyến rũ'),(130,'Louis Vuitton Monogram Majesty',19,250000.00,NULL,'image-1729931845691.jpg',18,47,10,'Sang trọng và tinh tế'),(131,'Louis Vuitton Voyageur Blazer',19,280000.00,NULL,'image-1729931889706.jpg',18,46,11,'Cảm hứng từ tinh thần phiêu lưu, đặc biệt cho những ai yêu thích sự dịch chuyển'),(132,'Louis Vuitton Luxe Nomade',19,380000.00,NULL,'image-1729931929677.jpg',18,47,13,'Đầm dạ hội với các chi tiết ánh vàng, biểu tượng của sự quý phái'),(133,'Louis Vuitton Metropolitan Trench',19,310000.00,NULL,'image-1729931996825.jpg',18,46,9,'Phong cách thành thị, vừa hiện đại vừa cổ điển'),(134,'Gucci Évasion Hoodie',20,220000.00,NULL,'image-1729932083509.jpg',18,46,10,'thiết kế phá cách, dành cho những ai yêu thích sự tự do'),(135,'Gucci Horizon Jacket',20,130000.00,NULL,'image-1729932133721.jpg',18,47,11,'lấy cảm hứng từ đường chân trời, cho người thích khám phá'),(136,'Gucci Signature Silk',20,280000.00,NULL,'image-1729932188379.jpg',18,45,14,'dành cho các dịp đặc biệt'),(137,'Chanel Nuit de Luxe',21,230000.00,NULL,'image-1729932257419.jpg',18,47,10,'Trang phục dự tiệc với các chi tiết tinh xảo'),(138,'Chanel Velours Voyage',21,430000.00,NULL,'image-1729932307800.jpg',18,48,11,'sang trọng, hoàn hảo'),(139,'Dior Promenade',22,255000.00,NULL,'image-1729932510088.jpg',18,46,10,'thanh lịch dành cho những buổi dạo chơi'),(140,'Dior Eclipse Jacket',22,259000.00,NULL,'image-1729932546297.jpg',18,47,11,'họa tiết độc đáo, tạo điểm nhấn như bóng đêm và ánh sáng hòa quyện'),(141,'Dior Iconic Traces',22,360000.00,NULL,'image-1729932592576.jpg',18,48,11,'mang đậm dấu ấn thương hiệu'),(142,'Dior City Lights',22,160000.00,NULL,'image-1729932624368.jpg',18,47,10,'lấp lánh như ánh đèn thành phố về đêm'),(143,'Burberry Lux Nomad Cape',28,150000.00,NULL,'image-1729932691788.jpg',18,46,12,'Phong cách phiêu lưu, dành cho những ai yêu thích khám phá và thời trang.'),(144,'Burberry Riviera Charm',28,230000.00,NULL,'image-1729932728318.jpg',18,47,10,'nhẹ nhàng với phong cách miền biển Riviera'),(145,'Burberry Opulence Coat',28,390000.00,NULL,'image-1729932762377.jpg',18,47,11,'sang trọng, với chất liệu cao cấp và thiết kế độc đáo.');
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
INSERT INTO `users` VALUES ('hi@gmail.com','$2b$10$s4imQ4xf41bSufux3Hl/pO3flqXCEX5y.cumAMS8Z4rsPZNuo9S/S'),('hohoangphucjob@gmail.com','$2b$10$QEEQ.c4mpmTzM3avRlCH8O.GtxlfLOHdx.q6az0IUm1SqyTzxJwo6'),('phuc@gmail.com','$2b$10$Sy.JDPpczJ9sREBH6i26LuBV/t6AuM50T/3rJjGwzRG.bJ3H/j862'),('quocanhanh1204@gmail.com','$2b$10$O9LGOJtBPV/7UsVc76.hx.SaRuTcQUeKgsBzAtior7GOGhCvL4B.q'),('tuananh2001@gmail.com','$2b$10$7zo2K3kl2RqPAvLqhJZ28esO/9QT8prQqxzjUpwiUKx88jbmqd0aO'),('tuananhanh0401@gmail.com','$2b$10$hPaClvDqYBxO0SfILm2xVOHf1YHZ2oL1M/FW1829VIFSsQD7LmYt6'),('tuananhanh1204@gmail.com','$2b$10$VvxojDBIbJ8N822GJXDs0.XseNnw7mQgAdvmJrB/hyAjD38pyJK8u');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tmdtquanao'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23 12:00:07
