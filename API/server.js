const express = require("express");
const session = require("express-session")
const routes = require("./routes");

const app = express();

global.connection = require("./src/database");

app.use(express.json());

app.use(
  session({
      name: 'SESSION_ID',      // cookie name stored in the web browser
      secret: 'my_secret',     // helps to protect session
      resave: true,
      saveUninitialized: true,
      cookie: {
          maxAge: 1 * (24 * 60 * 60 * 1000), // days * (hours * minutes * seconds * 1000) => session is stored 1 day
      }
  })
);

app.use(routes);

app.listen(3000, function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Server Started At Port 3000")
  }
});