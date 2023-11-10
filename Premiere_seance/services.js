//Définition des fonction
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gaumont_pathe'
});

export default {

    /**
     * 
     * @returns 
     */
  getEveryFilms () {
    return new Promise((reject, resolve) => {
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
  }
}