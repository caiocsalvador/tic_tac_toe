-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Set-2017 às 18:57
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tic_tac_toe`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `player1` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `player2` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `winner` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `draw` tinyint(4) NOT NULL DEFAULT '0',
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `matches`
--

INSERT INTO `matches` (`id`, `player1`, `player2`, `winner`, `draw`, `datetime`) VALUES
(31, 'Joe', 'Tom', '', 1, '2017-09-09 18:55:41'),
(30, 'Joe', 'Tom', 'Tom', 0, '2017-09-09 18:55:34'),
(29, 'Joe', 'Tom', 'Joe', 0, '2017-09-09 18:55:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
