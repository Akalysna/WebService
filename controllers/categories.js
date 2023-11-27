import Service from "../service/categories.js"

export default {

    getCategories: (req, res) => {
        Service.getCategories(req.query.limit, req.query.offset).then(results => {
            res.header('Content-Type', 'application/json')
            res.status(200).json(results)
        })
            .catch(err => {
                console.error(err)
                res.header('Content-Type', 'text/html')
                res.status(404).send('Une Erreur est survenue')
            })
    },

    getSingleCategory: (req, res) => {
        Service.getSingleCategory(req.params.uid).then(results => {
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

    insertCategory: (req, res) => {
        // ajoute un film
        Service.insertCategory(req.body).then(results => {
            res.header('Content-Type', 'application/json')
            res.status(201).json(results)
        })
            .catch(err => {
                console.log(err)
                res.header('Content-Type', 'text/html')
                res.status(422).send('Une Erreur est survenue')
            })
    },

    updateCategory: (req, res) => {
        // ecrase un film
        Service.updateCategory(req.body, req.params.uid)
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                console.error(err)
                res.status(500).send('Une Erreur est survenue')
            })
    },

    patchCategory: (req, res) => {
        // corrige un champ d'un film
        Service.patchCategory(req.body, req.params.uid)
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

    deleteCategory: (req, res) => {
        Service.deleteCategory(req.params.uid)
            .then(results => {
                res.header('Content-Type', 'application/json')
                res.status(200).json(results);
            })
            .catch(err => {
                console.log(err)
                res.header('Content-Type', 'text/html')
                res.status(422).send('Une Erreur est survenue')
            })
    },


    getMoviesOfCategorie: (req, res) => {
        
        Service.getMoviesOfCategorie(req.params.uid).then(results => {
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


    addMovieCategory: (req, res) => {

        Service.addMovieCategory(req.params.uidMov, req.params.uidCat).then(results => {
            res.header('Content-Type', 'application/json')
            res.status(201).json(results)
        })
            .catch(err => {
                console.log(err)
                res.header('Content-Type', 'text/html')
                res.status(422).send('Une Erreur est survenue')
            })

    },

    removeMovieCategory: (req, res) => {

        Service.removeMovieCategory(req.params.uidMov, req.params.uidCat).then(results => {
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