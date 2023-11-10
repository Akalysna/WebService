# Installation
Assurez vous d'avoir node 18.16.0 d'installé.

Déplacez vous dans le répertoire "Premiere_seance" avec la commande
`cd Premiere_seance`

Exécutez la commande suivante dans le dossier du devoir pour installer les dépendances
`npm install`

Pour lancer le service 
`node app.js` ou `nodemon app.js` si vous avez nodemon

Le service écoute sur le port 3000 (http://localhost:3000)

## Base de données
version : 10.4.21-MariaDB
Pour Installer la base de données, vous devez disposer d'un logiciel tel que xampp ou une alternative.
Le service va essayer de se connecter a root@localhost sur la base de données gaumont_pathe.
Une fois xampp lancé, importez le fichier gaumont_pathe.sql dans le SGBD (en ligne de commande ou par interface), il devrait créer la base de données ainsi que la table et ses données tout seul.

# Nodejs
Les paramètres de body lors des requêtes POST, PUT, et PATCH sont transmisent sous forme de multipart/form-data et non en application.json

## Swagger 
La documentation swagger se trouve à l'url suivante : http://localhost:3000/api-docs

# Utilisation des fichiers
## app.js
Le fichier app.js initialise le server et défini les routes utilisés

## services.js
Le fichier services.js gère l'ensemble des méthodes requisent pour communiquer avec la base de données