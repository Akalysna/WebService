-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 27 nov. 2023 à 10:41
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gaumont_pathe`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_categories` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `uid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categories`, `name`, `uid`) VALUES
(1, 'Comédie', '356a192b7913b04c54574d18c28d46e6395428ab'),
(2, 'Policier', 'da4b9237bacccdf19c0760cab7aec4a8359010b0'),
(3, 'Romance', '77de68daecd823babbb58edb1c8e14d7106e83bb'),
(4, 'Action', '1b6453892473a467d07372d45eb05abc2031647a'),
(5, 'Drame', 'ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4');

-- --------------------------------------------------------

--
-- Structure de la table `categoriser`
--

CREATE TABLE `categoriser` (
  `id_categories` int(11) NOT NULL,
  `id_movies` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categoriser`
--

INSERT INTO `categoriser` (`id_categories`, `id_movies`) VALUES
(1, 1),
(1, 2),
(4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

CREATE TABLE `movies` (
  `id_movies` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `release_date` date NOT NULL,
  `note` int(11) DEFAULT NULL,
  `poster` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`id_movies`, `title`, `uid`, `description`, `release_date`, `note`, `poster`) VALUES
(1, 'Free Guy', '356a192b7913b04c54574d18c28d46e6395428ab', 'Un pnj dans un monde jeu vidéaliste', '2023-11-01', 4, NULL),
(2, 'Moi moche et méchant', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'je s\'appelle gru', '2020-11-10', 3, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categories`);

--
-- Index pour la table `categoriser`
--
ALTER TABLE `categoriser`
  ADD PRIMARY KEY (`id_categories`,`id_movies`),
  ADD KEY `categoriser_movies0_FK` (`id_movies`);

--
-- Index pour la table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id_movies`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `movies`
--
ALTER TABLE `movies`
  MODIFY `id_movies` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categoriser`
--
ALTER TABLE `categoriser`
  ADD CONSTRAINT `categoriser_categories_FK` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id_categories`),
  ADD CONSTRAINT `categoriser_movies0_FK` FOREIGN KEY (`id_movies`) REFERENCES `movies` (`id_movies`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
