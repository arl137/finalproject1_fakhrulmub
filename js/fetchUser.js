const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',    // Replace with your database username
  password: 'yourPassword', // Replace with your database password
  database: 'telkomsel_nama_2'
});

// Connect to the MySQL server
connection.connect(err => {
  if (err) {
    return console.error('error connecting: ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId);
});

// SQL query to fetch all users
const query = 'SELECT * FROM users';

// Execute the query
connection.query(query, (err, results, fields) => {
  if (err) throw err;

  // Log each user to the console
  console.log("Users:");
  results.forEach(user => {
    console.log(`${user.id}: ${user.name} - ${user.email}`);
  });

  // End the database connection
  connection.end();
});
