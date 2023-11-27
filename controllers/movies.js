import Service from "../service/movies.js"

export default {

  getMovies: (req, res) => {
    Service.getEveryMovies(req.query.limit, req.query.offset).then(results => {
      res.header('Content-Type', 'application/json')
      res.status(200).json(results)
    })
      .catch(err => {
        console.error(err)
        res.header('Content-Type', 'text/html')
        res.status(404).send('Une Erreur est survenue')
      })
  },

  getSingleMovie: (req, res) => {
    Service.getSingleMovie(req.params.uid).then(results => {
      if (results == {}) {
        res.sendStatus(404)
      }
      else {
        res.header('Content-Type', 'application/json')
        res.status(200).json(results)
      }
    })
      .catch(err => {
        console.error(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  },

  getCategoriesOfMovie: (req, res) => {
    // query le film d'id :id
    Service.getCategoriesOfMovie(req.params.uid).then(results => {
      if (results == {}) {
        res.sendStatus(404)
      }
      else {
        res.header('Content-Type', 'application/json')
        res.status(200).json(results)
      }
    })
      .catch(err => {
        console.error(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  },

  insertFilm: (req, res) => {
    // ajoute un film
    Service.insertFilm(req.body).then(results => {
      res.header('Content-Type', 'application/json')
      res.status(201).json(results)
    })
      .catch(err => {
        console.log(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  },

  updateFilm: (req, res) => {
    // ecrase un film
    Service.updateFilm(req.body, req.params.uid)
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Une Erreur est survenue')
      })
  },

  patchFilm: (req, res) => {
    // corrige un champ d'un film
    Service.patchFilm(req.body, req.params.uid)
      .then(results => {
        res.header('Content-Type', 'application/json')
        res.status(200).json(results)
      })
      .catch(err => {
        console.error(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  },

  deleteFilm: (req, res) => {
    // supprime un film
    Service.deleteFilm(req.params.uid)
      .then(results => {
        res.header('Content-Type', 'application/json')
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  }
}