//Définition des fonction
import mysql from 'mysql2';
import dotenv from 'dotenv';
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
      const query = "SELECT * FROM films;";
      connection.query(query, (err, results) => {
        if (!err) {
          resolve(results);
        }
        else {
          reject(err);
        }
      })
    })
  },

  getSingleFilm(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films WHERE id_film = ?;";
      connection.query(query, [id], (err, results) => {
        if (!err) {
          resolve(results[0]);
        }
        else {
          reject(err);
        }
      })
    })
  },

  insertFilm(body) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `films`(`title`, `description`, `release_date`, `note`) VALUES (?,?,?,?)";
      const params = [
        body.title ?? '',
        body.description ?? '',
        body.release_date ?? new Date().toISOString(),
        body.note ?? 0
      ];
      connection.query(query, params, (err, results) => {
        if (!err) {
          query = "SELECT LAST_INSERT_id() as id;";
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
              reject(err);
            }
          })
        }
        else {
          reject(err);
        }
      })
    })
  },

  updateFilm(body, id) {

    return new Promise((resolve, reject) => {

      /**Requête SQL */
      let query = "UPDATE `films` SET `title`= ?,`description`= ?,`release_date`= ?,`note`= ? WHERE `id_film`= ?"

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

          this.getSingleFilm(id).then((result) => {
            resolve(result)
            
          }).catch((err) => {
            reject(err)
          })
        }

        else
          reject(err)
      })
    })
  },

  patchFilm(body, id) {
    return new Promise((resolve, reject) => {

      //Vérifier que le body possède au moins une clé
      if(!body){
        reject(422)
      }

      /**Requête MQL */
      let query = "UPDATE `films` SET "

      /**Paramètres de la requête */
      let params = []

      // La requête est construite en bouclant sur les clées du body, puisqu'elles sont égale au champs de la table
      Object.keys(body).forEach(key => {
        if (key == "id_film") {
          return;
        }
        params.push(value)
        query += `${key}=?, `
      })

      //Suppression de la virgule en trop et complétion de la requête
      query = query.slice(0, query.length - 2)
      query += " WHERE `id_film` = ?"
      params.push(id) //Ajout de l'id du film

      //Récupération du résultat de la requête
      connection.query(query, params, (err, results) => {

        //S'il n'y a pas d'erreur renvoyer le film en question
        if (!err) {
          this.getSingleFilm(id).then(results => {
            resolve(results)
          }).catch(err => {
            reject(err)
          })
        } else {
          reject(err)
        }
      })
    })
  },
  
  deleteFilm(id) {
    return new Promise((resolve, reject) => {

      let query = "DELETE FROM `films` WHERE `id_film` = ?"
      let params = [id]

      let res = ""

      this.getSingleFilm(id).then(results => {

        res = results

        connection.query(query, params, (err, results) => {

          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        })

      }).catch(err => {
        reject(err)
      })
    })
  }
}