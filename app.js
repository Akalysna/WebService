//Définition des routes
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

import moviesCtrl from "./controllers/movies.js"


const app = express();
app.use(cors());

const upload = multer()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ES from 'express-swagger-generator'
const expressSwagger = ES(app);
let options = {
  swaggerDefinition: {
    info: {
      description: 'Devoir Ynov WebService',
      title: 'Webservice de film',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./*.js'] //Path to the API handle folder
};
expressSwagger(options)


/**
 * Cette route retourne la liste des films de la base de données
 * @route GET /movies
 * @group Film - Opération à propos des films
 * @returns Liste des films
 */
app.get('/movies', moviesCtrl.getMovies)

/**
 * Cette route retourne un film selon l'id spécifié
 * @route GET /movies/:id
 * @param {int} id Id du film a récupérer
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film
 */
app.get('/movies/:uid', moviesCtrl.getSingleMovie)

/**
 * Cette route retourne les catégories d'un film selon l'id spécifié
 * @route GET /movies/:id
 * @param {int} id Id du film a récupérer
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film
 */
app.get('/movies/:uid/categories', moviesCtrl.getCategoriesOfMovie)

/**
 * Cette route insère un film avec les données fournies
 * @route POST /movies
 * @param {string} title Titre du film
 * @param {string} description Description du film a insérer
 * @param {string} release_date Date de parution du film a insérer
 * @param {int} note note / 5 du film a insérer
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film inséré
 */
app.post('/movies', upload.fields([]), moviesCtrl.insertFilm)

/**
 * Cette route écrase un film avec les données fournies
 * @route PUT /movies/:id
 * @param {int} id Id du film a écraser
 * @param {string} title Nouveau titre du film
 * @param {string} description Nouvelle Description du film
 * @param {string} release_date Nouvelle date de parution du film
 * @param {int} note Nouvelle note du film
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film écrasé
 */
app.put('/movies/:uid', upload.fields([]), moviesCtrl.updateFilm)

/**
 * Cette route corrige un film avec les données fournies
 * @route PATCH /movies/:id
 * @param {int} id Id du film a corriger
 * @param {string} title Optionnel - Nouveau titre du film
 * @param {string} description Optionnel - Nouvelle Description du film
 * @param {string} release_date Optionnel - Nouvelle date de parution du film
 * @param {int} note Optionnel - Nouvelle note du film
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film corrigé
 */
app.patch('/movies/:uid', upload.fields([]), moviesCtrl.patchFilm)

/**
 * Cette route supprime un film selon l'id fourni
 * @route DELETE /movies/:id
 * @param {int} id Id du film a corriger
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film supprimé
 */
app.delete('/movies/:uid', upload.fields([]), moviesCtrl.deleteFilm)

app.listen(3000, () => console.log("WebService en écoute sur le port 3000"));