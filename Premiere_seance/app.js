//Définition des routes
import express from 'express';
const app = express();
import services from './services.js';
import cors from 'cors';
app.use(cors());

app.get('/', (req, res) => {

})

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