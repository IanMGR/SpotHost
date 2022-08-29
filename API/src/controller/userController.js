const user = require("../model/user");

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async login(req, res){
    const  { param } = req.params;
    const logged = await user.login();
    return res.send(logged);
  },

  async read(req, res){
    const status = await porcao.getStatus();
    console.log(status);
    return res.send(status);
  },

  async update(req, res){
    const  { param } = req.params;
    const response = await porcao.update(param);
    return res.send(response);
  }
}