const porcao = require("../model/porcaoUnica");

module.exports = {
  async index(req, res){
    return res.send('porção única');
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