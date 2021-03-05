const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: process.env.PASSWORD,
  database: 'restaurant'
});
connection.connect((err: any) => {
  if (err) throw err;
  console.log('Connected!');
});