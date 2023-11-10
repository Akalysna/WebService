//Définition des routes
import express from 'express';
const app = express();
import services from './services.js';
import cors from 'cors';
import multer from 'multer';
app.use(cors());
const upload = multer()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/films', (req, res) => {
  services.getEveryFilms().then(results => {
    res.send(results)
  })
  .catch(err => {
    console.error(err)
    res.status(500).send('Une Erreur est survenue')
  })
})

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

app.post('/films', upload.fields([]), (req, res) => {
  // ajoute un film
  services.insertFilm(req.body).then(results => {
    res.status(201).json(results)
  })
  .catch(err => {
    console.log(err)
  })
})

app.put('/films/:id', upload.fields([]), (req, res) => {
  // ecrase un film
})

app.patch('/films/:id', upload.fields([]), (req, res) => {
  // corrige un champ d'un film
})

app.delete('/films/:id', upload.fields([]), (req, res) => {
  // supprime un film
})




app.listen(3000, () => console.log("WebService en écoute sur le port 3000"));