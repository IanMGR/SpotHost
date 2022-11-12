const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser')
const cors = require("cors")

const globalvar = require("./src/global");
const routes = require("./routes");


require('dotenv-safe').config();


const app = express();

app.use(cors({
  //origin: ["http://192.168.1.26:3000"],
  origin: ["http://localhost:3000"],
  credentials : true
}));

global.connection = require("./src/database");

app.use(bodyParser.json());

app.use(
  session({ 
      secret: global.session_secret,     // helps to protect session
      resave: false,
      saveUninitialized: true,
  })
);

app.use(routes);

app.listen(8000, function(err) {
  if(err) { 
    console.log(err);
  }
  else {
    console.log("Server Started At Port 8000")
  }
});