const express = require("express");
const routes = require("./routes");
const app = express();
global.connection = require("./src/database");

app.use(express.json());
app.use(routes);

app.listen(3000);