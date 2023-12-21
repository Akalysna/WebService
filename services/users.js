//Définition des fonction
import { connection } from "../database/db.js"
import categories from "./categories.js"
import util from 'node:util'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {

  getSingleUser(uid) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3006/api/account/'+uid, {
        method: 'get'
      })
        .then(res => {
          if(res.status == 200) {
            return res.json();
          }
          else {
            throw new Error(res.status);
          }
        })
        .then(data => {
          resolve(data)
        })
        .catch(stat => {
          reject(stat)
        })
    })
  },

  insertFilm(body, files) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `movies`(`title`, `description`, `release_date`, `note`, `poster`) VALUES (?,?,?,?,?)";
      const params = [
        body.title ?? '',
        body.description ?? '',
        body.release_date ?? new Date().toISOString(),
        body.note ?? 0,
        files?.poster?.[0].filename ? "http://localhost:3000/uploads/"+ files.poster[0].filename : null
      ];
      connection.query(query, params, (err, results) => {
        if (!err) {

          //Récupération de l'id du dernier film inséré
          query = "SELECT uid FROM movies WHERE id_movies = (SELECT LAST_INSERT_ID());";
          connection.query(query, (err, results) => {
            if (!err) {
              this.getSingleMovie(results[0].uid).then(results => {
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

  updateFilm(body, uid) {

    return new Promise((resolve, reject) => {

      /**Requête SQL */
      let query = "UPDATE `movies` SET `title`= ?,`description`= ?,`release_date`= ?,`note`= ? WHERE `uid`= ?"

      /**Paramètres de la requête */
      const params = [
        body.title ?? '',
        body.description ?? '',
        body.release_date ?? new Date().toISOString(),
        body.note ?? 0,
        uid
      ];

      connection.query(query, params, (err, results) => {

        //Retour de la nouvelle valeur du film
        if (!err) {

          this.getSingleMovie(uid).then((result) => {
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
  }
}