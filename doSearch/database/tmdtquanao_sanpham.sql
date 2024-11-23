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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-27 13:04:36
