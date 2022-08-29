function connect(){
  if(global.conn && global.conn.state !== 'disconnected')
      return global.conn;

  const mysql = require("mysql2");
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "spothost"
  });

  console.log("Connected to MySQL!");
  global.conn = connection;
  return connection;
}

connect();

module.exports = {
  
}