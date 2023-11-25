-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
CREATE DATABASE gaumont_pathe;

USE gaumont_pathe;
-- Hôte : 127.0.0.1
-- Généré le : ven. 10 nov. 2023 à 15:43
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gaumont_pathe`
--

-- --------------------------------------------------------

--
-- Structure de la table `films`
--

CREATE TABLE `films` (
  `id_film` int(11) NOT NULL,
  `title` varchar(128) COLLATE utf8_bin NOT NULL,
  `description` varchar(2048) COLLATE utf8_bin NOT NULL,
  `release_date` date NOT NULL,
  `note` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `films`
--

INSERT INTO `films` (`id_film`, `title`, `description`, `release_date`, `note`) VALUES
(1, 'Free Guy', 'Un pnj dans un monde jeu vidéaliste', '2023-11-01', 4),
(2, 'Moi moche et méchant', 'je s\'appelle gru', '2020-11-10', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id_film`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `films`
--
ALTER TABLE `films`
  MODIFY `id_film` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
