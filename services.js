//Définition des fonction
import mysql from 'mysql2';
import dotenv from 'dotenv';
import util from 'node:util'
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE
});

export default {
  getEveryFilms() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM movies;";
      connection.query(query, (err, results) => {
        if (!err) {
          resolve(results);
        }
        else {
          reject({
            status : 422,
            err : err
          });
        }
      })
    })
  },

  getSingleFilm(uid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM movies WHERE id_movies = ?;";
      connection.query(query, [uid], (err, results) => {
        if (!err) {
          resolve(results[0]);
        }
        else {
          reject({
            status : 422,
            err : err
          });
        }
      })
    })
  },

  insertFilm(body) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `movies`(`title`, `description`, `release_date`, `note`) VALUES (?,?,?,?)";
      const params = [
        body.title ?? '',
        body.description ?? '',
        body.release_date ?? new Date().toISOString(),
        body.note ?? 0
      ];
      connection.query(query, params, (err, results) => {
        if (!err) {

          //Récupération de l'id du dernier film inséré
          query = "SELECT LAST_INSERT_id() as uid;";
          connection.query(query, (err, results) => {
            if (!err) {
              this.getSingleFilm(results[0].id).then(results => {
                resolve(results)
              })
                .catch(err => {
                  console.error(err)
                })
            }
            else {
              reject({
                status : 422,
                err : err
              });
            }
          })
        }
        else {
          reject({
            status : 422,
            err : err
          });
        }
      })
    })
  },

  updateFilm(body, uid) {

    return new Promise((resolve, reject) => {

      /**Requête SQL */
      let query = "UPDATE `movies` SET `title`= ?,`description`= ?,`release_date`= ?,`note`= ? WHERE `id_movies`= ?"

      /**Paramètres de la requête */
      const params = [
        body.title ?? '',
        body.description ?? '',
        body.release_date ?? new Date().toISOString(),
        body.note ?? 0,
        id
      ];

      connection.query(query, params, (err, results) => {

        //Retour de la nouvelle valeur du film
        if (!err){

          this.getSingleFilm(uid).then((result) => {
            resolve(result)
            
          }).catch((err) => {
            reject({
              status : 422,
              err : err
            })
          })
        }

        else
          reject({
            status : 422,
            err : err
          })
      })
    })
  },

  patchFilm(body, uid) {
    return new Promise((resolve, reject) => {

      //Vérifier que le body est défini
      if(!body){
        reject({
          status : 422,
          err : "Le body est undefined. Veuillez remplir les champs et relancer la requête"
        })
      }

      /**Paramètres de la requête */
      let params = []
      let queryStr = []
      
      // La requête est construite en bouclant sur les clées du body, puisqu'elles sont égale au champs de la table
      Object.keys(body).forEach(key => {
        if (key == "id_movies") {
          return;
        }
        params.push(body[key])
        queryStr.push(`${key}=?`)
      })

      params.push(id) //Ajout de l'id du film
      
      /**Requête SQL */
      let query = util.format("UPDATE `movies` SET %s WHERE `id_movies` = ?", queryStr.join())

      //Récupération du résultat de la requête
      connection.query(query, params, (err, results) => {

        //S'il n'y a pas d'erreur renvoyer le film en question
        if (!err) {
          this.getSingleFilm(uid).then(results => {
            resolve(results)

          }).catch(err => { 
            reject({
              status : 422,
              err : err
            })
          })
        } else {
          reject({
            status : 422,
            err : err
          })
        }
      })
    })
  },
  
  deleteFilm(uid) {
    return new Promise((resolve, reject) => {

      let query = "DELETE FROM `movies` WHERE `id_movies` = ?"
      let params = [uid]


      this.getSingleFilm(uid).then(results => {

        connection.query(query, params, (err, results1) => {

          if (!err) {
            resolve(results)
          } else {
            reject({
              status : 422,
              err : err
            })
          }
        })

      }).catch(err => {
        reject({
          status : 422,
          err : err
        })
      })
    })
  },
  getCategoriesOfMovie(uid) {
    return new Promise((resolve, reject) => {
      let query = "SELECT movies.`uid` as movie_id, categories.uid AS category_id, categories.name FROM `movies` LEFT JOIN categoriser ON categoriser.id_movies = movies.id_movies LEFT JOIN categories ON categories.id_categories = categoriser.id_categories WHERE movies.uid = ?;";
      let params = [uid];
      connection.query(query, params, (err, results) => {
        if(!err) {
          resolve(results);
        }
        else {
          reject(err);
        }
      })
    })
  }
}