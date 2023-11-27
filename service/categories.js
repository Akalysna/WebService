import { connection } from "../database/db.js"
import util from 'node:util'
import { rejects } from "node:assert"

export default {

  getCategories(limit, offset) {

    return new Promise((resolve, reject) => {

      let pagination = ""
      let params = []

      if (limit || offset) {
        pagination = "LIMIT ? OFFSET ?"
        params.push(limit ? Number(limit) : 10)
        params.push(offset ? Number(offset) : 0)
      }

      const query = util.format("SELECT `name`, `uid` FROM categories %s;", pagination)

      connection.query(query, params, (err, results) => {
        if (!err) {
          resolve(results);
        }
        else {
          reject({
            status: 422,
            err: err
          });
        }
      })
    })
  },

  getSingleCategory(uid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT `name`, `uid` FROM categories WHERE uid = ?;";
      connection.query(query, [uid], (err, results) => {
        if (!err) {
          resolve(results[0]);
        }
        else {
          reject({
            status: 422,
            err: err
          });
        }
      })
    })
  },

  insertCategory(body) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `categories`(`name`) VALUES (?)";
      const params = [
        body.name ?? ''
      ];
      connection.query(query, params, (err, results) => {
        if (!err) {

          //Récupération de l'id du dernier film inséré
          query = "SELECT LAST_INSERT_id() as uid;";
          connection.query(query, (err, results) => {
            if (!err) {
              this.getSingleCategory(results[0].uid).then(results => {
                resolve(results)
              })
                .catch(err => {
                  console.error(err)
                })
            }
            else {
              reject({
                status: 422,
                err: err
              });
            }
          })
        }
        else {
          reject({
            status: 422,
            err: err
          });
        }
      })
    })
  },

  updateCategory(body, uid) {

    return new Promise((resolve, reject) => {

      /**Requête SQL */
      let query = "UPDATE `categories` SET `name`= ? WHERE `uid`= ?"

      /**Paramètres de la requête */
      const params = [
        body.name ?? '', uid
      ];

      connection.query(query, params, (err, results) => {

        //Retour de la nouvelle valeur du film
        if (!err) {

          this.getSingleCategory(uid).then((result) => {
            resolve(result)

          }).catch((err) => {
            reject({
              status: 422,
              err: err
            })
          })
        }

        else
          reject({
            status: 422,
            err: err
          })
      })
    })
  },

  patchCategory(body, uid) {
    return new Promise((resolve, reject) => {

      //Vérifier que le body est défini
      if (!body) {
        reject({
          status: 422,
          err: "Le body est undefined. Veuillez remplir les champs et relancer la requête"
        })
      }

      /**Paramètres de la requête */
      let params = []
      let queryStr = []

      // La requête est construite en bouclant sur les clées du body, puisqu'elles sont égale au champs de la table
      Object.keys(body).forEach(key => {
        if (key == "id_categories") {
          return;
        }
        params.push(body[key])
        queryStr.push(`${key}=?`)
      })

      params.push(uid) //Ajout de l'id du film

      /**Requête SQL */
      let query = util.format("UPDATE `categories` SET %s WHERE `uid` = ?", queryStr.join())

      //Récupération du résultat de la requête
      connection.query(query, params, (err, results) => {

        //S'il n'y a pas d'erreur renvoyer le film en question
        if (!err) {
          this.getSingleCategory(uid).then(results => {
            resolve(results)

          }).catch(err => {
            reject({
              status: 422,
              err: err
            })
          })
        } else {
          reject({
            status: 422,
            err: err
          })
        }
      })
    })
  },

  deleteCategory(uid) {
    return new Promise((resolve, reject) => {

      let query = "DELETE FROM `categories` WHERE `uid` = ?"
      let params = [uid]


      this.getSingleCategory(uid).then(results => {

        connection.query(query, params, (err, results1) => {

          if (!err) {
            resolve(results)
          } else {
            reject({
              status: 422,
              err: err
            })
          }
        })

      }).catch(err => {
        reject({
          status: 422,
          err: err
        })
      })
    })
  },

    getMoviesOfCategory(uid) {
        return new Promise((resolve, reject) => {
            let query = "SELECT movies.`uid` AS movie_id, categories.uid AS category_id, movies.title FROM `categories` LEFT JOIN categoriser ON categoriser.id_movies = movies.id_movies LEFT JOIN categories ON categories.id_categories = categoriser.id_categories WHERE categories.uid = ?;"
            let params = [uid];
            connection.query(query, params, (err, results) => {
                if (!err) {
                    resolve(results);
                }
                else {
                    reject(err);
                }
            })
        })
    }
}