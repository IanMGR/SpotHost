const app = require("express");

const userController = require("./src/controller/userController");
const trackController = require("./src/controller/trackController");
const roomController = require("./src/controller/roomController");
const routes = app.Router();

const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user_id) {
    next()
  } else {
    res.status(401).send('User not authenticated')
  }
}

const validatePayloadMiddleware = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(403).send('Payload needed');
  }
};

routes.get('/api/user', authMiddleware, userController.getUser);
routes.post('/api/user/add',validatePayloadMiddleware, userController.add);
routes.post('/api/user/login',validatePayloadMiddleware, userController.login);
routes.get('/api/user/login', userController.getUser);
routes.get('/api/user/logout',userController.logout);
routes.get('/api/user/callback',userController.callback);

routes.get('/api/track/current',trackController.current);
routes.get('/api/track/play/:room_code',trackController.playTrack);

routes.get('/api/room/all',roomController.all);
routes.post('/api/room/add',roomController.add);
routes.get('/api/room/:id/delete',roomController.delete);
routes.post('/api/room/update/:id',roomController.update);
routes.get('/api/room/:code/validate',roomController.validate);

module.exports = routes;