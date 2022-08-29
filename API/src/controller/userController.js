const user = require("../model/user");

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async login(req, res){
    if (req.session.userId){
      return res.json({result: 'ERROR', message: 'User already logged in.'});
    }
    const params = req.body;
    const userInfo = await user.login(params);
    if (userInfo){
      req.session.userId = userInfo.id;
      console.log("user " + req.session.userId + " logged in")
    }
    return res.send({result:'SUCCESS'});
  },

  async logout(req, res){
    if (req.session.userId){
      delete req.session.userId
      return res.json({result:'SUCCESS'})
    }

    return res.json({result: 'ERROR', message: 'User is not logged in.'});
  }
}