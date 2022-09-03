const app = require("express");

const userController = require("./src/controller/userController");
const trackController = require("./src/controller/trackController");
const routes = app.Router();

routes.get('/user',userController.index);
//routes.post('/user/login',userController.login);
routes.get('/user/login',userController.login);
routes.get('/user/logout',userController.logout);
routes.get('/user/callback',userController.callback);

routes.get('/track/current',trackController.current);

module.exports = routes;