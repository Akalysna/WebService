//Définition des fonction
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gaumont_pathe'
});

export default {
  getEveryFilms () {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM films;";
      connection.query(query, (err, results) => {
        if(!err) {
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
        if(!err) {
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
        if(!err) {
          query = "SELECT LAST_INSERT_id() as id;";
          connection.query(query, (err, results) => {
            if(!err) {
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

  },
  patchFilm(body, id) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE films SET ";
      let params = [];
      Object.keys(body).forEach(key => {
        query += key+"=? ";
        params.push(body[key]);
      })

    })
  },
  deleteFilm(body, id) {

  }
}