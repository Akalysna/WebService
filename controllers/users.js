import Service from "../services/users.js"

export default {

  getSingleUser: (req, res) => {
    Service.getSingleUser(req.params.uid).then(results => {
      if (results == {}) {
        res.sendStatus(404)
      }
      else {
        res.header('Content-Type', 'application/json')
        const url = req.protocol + "://" + req.get('host') + ":3000/" + req.url;
        // res.header('Link', '<http://localhost:3000/movies/'+req.params.uid+'/categories>; rel="GetMovieCategories"')
        res.header('Link', '<'+url+'>; rel="GetMovieCategories"')
        res.status(200).json(results)
      }
    })
    .catch(stat => {
      console.error(err)
      // res.header('Content-Type', 'text/html')
      res.sendStatus(stat)
  })
  },

  getRolesOfUser: (req, res) => {
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

  insertUser: (req, res) => {
    // ajoute un film
    Service.insertFilm(req.body, req.files).then(results => {
      res.header('Content-Type', 'application/json')
      res.status(201).json(results)
    })
      .catch(err => {
        console.log(err)
        res.header('Content-Type', 'text/html')
        res.status(422).send('Une Erreur est survenue')
      })
  },

  updateUser: (req, res) => {
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

  deleteUser: (req, res) => {
    // supprime un film
    Service.deleteUser(req.params.uid)
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