const app = require("express");

const userController = require("./src/controller/userController");
const trackController = require("./src/controller/trackController");
const roomController = require("./src/controller/roomController");
const routes = app.Router();

routes.get('/user',userController.index);
//routes.post('/user/login',userController.login);
routes.get('/user/login',userController.login);
routes.get('/user/logout',userController.logout);
routes.get('/user/callback',userController.callback);

routes.get('/track/current',trackController.current);
routes.get('/track/play',trackController.playTrack);

routes.get('/room/all',roomController.all);
routes.post('/room/add',roomController.add);
routes.get('/room/:id/delete',roomController.delete);
routes.post('/room/update/:id',roomController.update);
routes.get('/room/:code/validate',roomController.validate);

module.exports = routes;