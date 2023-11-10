# Installation
Assurez vous d'avoir node 18.16.0 d'installé.

Déplacez vous dans le répertoire "Premiere_seance" avec la commande
`cd Premiere_seance`

Exécutez la commande suivante dans le dossier du devoir pour installer les dépendances
`npm install`

Pour lancer le service 
`node app.js` ou `nodemon app.js` si vous avez nodemon

Le service écoute sur le port 3000 (http://localhost:3000)

# Nodejs
Les données dans le body sont transimit sous forme de form-data et non en JSON 

## Swagger 
La documentation swagger ce trouve à l'url suivante : http://localhost:3000/api-docs

# Utilisation des fichiers
## App.js
Le fichier app.js initialise le server et défini les routes utilisés