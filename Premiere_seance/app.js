//Définition des routes
import express from 'express';
const app = express();
import services from './services.js';
import cors from 'cors';
app.use(cors());
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
    res.send('Hellooooooooooooooooo')
})

/**
 * Cette fonction retourne la liste des films de la base de données
 * @route GET /api
 * @group Film - Opération à propos des films
 */
app.get('/films', (req, res) => {
  // query tous les films
})

app.get('/films/:id', (req, res) => {
  // query le film d'id :id
})

app.post('/films', (req, res) => {
  // ajoute un film
})

app.put('/films/:id', (req, res) => {
  // ecrase un film
})

app.patch('/films/:id', (req, res) => {
  // corrige un champ d'un film
})

app.delete('/films/:id', (req, res) => {
  // supprime un film
})

app.listen(3000, () => console.log("WebService en écoute sur le port 3000"));