//Définition des routes
import express from 'express';
const app = express();
import services from './services.js';
import cors from 'cors';
import multer from 'multer';
app.use(cors());
const upload = multer()
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ES from 'express-swagger-generator'
const expressSwagger= ES(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'Devoir Ynov WebService',
            title: 'Webservice de film',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * Cette route retourne la liste des films de la base de données
 * @route GET /films
 * @group Film - Opération à propos des films
 * @returns Liste des films
 */
app.get('/films', (req, res) => {
  services.getEveryFilms().then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

/**
 * Cette route retourne un film selon l'id spécifié
 * @route GET /films/:id
 * @param {int} id Id du film a récupérer
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film
 */
app.get('/films/:id', (req, res) => {
  // query le film d'id :id
  services.getSingleFilm(req.params.id).then(results => {
    res.send(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

/**
 * Cette route insère un film avec les données fournies
 * @route POST /films
 * @param {string} title Titre du film
 * @param {string} description Description du film a insérer
 * @param {string} release_date Date de parution du film a insérer
 * @param {int} note note / 5 du film a insérer
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film inséré
 */
app.post('/films', upload.fields([]), (req, res) => {
  // ajoute un film
  services.insertFilm(req.body).then(results => {
    res.status(201).json(results)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

/**
 * Cette route écrase un film avec les données fournies
 * @route PUT /films/:id
 * @param {int} id Id du film a écraser
 * @param {string} title Nouveau titre du film
 * @param {string} description Nouvelle Description du film
 * @param {string} release_date Nouvelle date de parution du film
 * @param {int} note Nouvelle note du film
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film écrasé
 */
app.put('/films/:id', upload.fields([]), (req, res) => {
  services.updateFilm(req.body, req.params.id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

app.patch('/films/:id', upload.fields([]), (req, res) => {
  // corrige un champ d'un film
  services.patchFilm(req.body, req.params.id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

/**
 * Cette route supprime un film selon l'id fourni
 * @route DELETE /films/:id
 * @param {int} id Id du film a corriger
 * @group Film - Opération à propos des films
 * @returns Objet contenant les détails du film supprimé
 */
app.delete('/films/:id', upload.fields([]), (req, res) => {
  services.deleteFilm(req.params.id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

app.listen(3000, () => console.log("WebService en écoute sur le port 3000"));