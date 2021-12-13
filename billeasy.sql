-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2021 at 10:28 PM
-- Server version: 5.7.36-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `billeasy`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(500) NOT NULL,
  `total_employee` int(11) DEFAULT '0',
  `blocked` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `total_employee`, `blocked`, `createdAt`, `updatedAt`) VALUES
(1, 'abc', 0, '0', '2021-12-12 07:10:11', '2021-12-12 07:10:11'),
(2, 'sales', 0, '0', '2021-12-12 07:10:38', '2021-12-12 07:10:38'),
(3, 'administration', 1, '0', '2021-12-12 07:11:01', '2021-12-12 07:59:11'),
(4, 'accounts', 0, '0', '2021-12-12 07:11:05', '2021-12-12 07:11:05'),
(5, 'management', 0, '0', '2021-12-12 07:11:29', '2021-12-12 07:11:29'),
(6, 'development', 0, '0', '2021-12-12 07:11:41', '2021-12-12 07:11:41'),
(7, 'designing', 0, '0', '2021-12-12 07:11:54', '2021-12-12 07:11:54');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `salary` bigint(20) NOT NULL DEFAULT '0',
  `joining_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `blocked` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `name`, `email`, `department_id`, `salary`, `joining_date`, `blocked`, `createdAt`, `updatedAt`) VALUES
(5, 'user1', 'user1@gmail.com', 1, 10000, '2021-01-19 00:00:00', '0', '2021-12-12 07:17:00', '2021-12-12 07:17:00'),
(6, 'user1', 'user1@gmail.com', 3, 5000, '2021-01-24 00:00:00', '0', '2021-12-12 07:59:11', '2021-12-12 07:59:11');

--
-- Triggers `employees`
--
DELIMITER $$
CREATE TRIGGER `department_total_employee` BEFORE INSERT ON `employees` FOR EACH ROW UPDATE departments SET `total_employee` = total_employee+1 WHERE `department_id` = NEW.`department_id`
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
