//Définition des fonction
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE
});