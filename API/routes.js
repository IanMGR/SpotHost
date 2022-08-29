const app = require("express");

const userController = require("./src/controller/userController");
const horarioController = require("./src/controller/horarioController");
const porcaoUnicaController = require("./src/controller/porcaoUnicaController");
const routes = app.Router();

routes.get('/user',userController.index);
routes.post('/login',userController.login);

routes.get('/horario',horarioController.index);
routes.post('/horario/add',horarioController.add);
routes.get('/horario/all',horarioController.all);
routes.get('/horario/toDispense',horarioController.toDispense);
routes.get('/horario/dispensed/:id',horarioController.dispensedStatus);
routes.get('/horario/:id',horarioController.read);
routes.get('/horario/:id/delete',horarioController.delete);
routes.post('/horario/update/:id',horarioController.update);

routes.get('/porcaoUnica',porcaoUnicaController.read);
routes.get('/porcaoUnica/:param',porcaoUnicaController.update);

module.exports = routes;