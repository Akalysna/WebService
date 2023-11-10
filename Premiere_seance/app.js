//Définition des routes
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gaumont_pathe'
});

app.get('/', (req, res) => {
  res.send('hello world');
})




app.listen(3000, () => console.log("WebService en écoute sur le port 3000"));