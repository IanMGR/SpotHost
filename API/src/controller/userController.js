const user = require("../model/user");

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async callback(req, res){
    code = req.query.code || null;
    state = req.query.state || null;
    if (state === null){
      res.redirect('/#' + new URLSearchParams({
        error: 'state_mismatch'
      }))
    }
    else {
      spotifyReponse = await user.getspottoken(code);
      req.session.spotifyToken = spotifyReponse.access_token;
      spotifyId = await user.getSpotifyId(spotifyReponse.access_token);
      req.session.spotifyId = spotifyId;
      console.log(req.session)
      //req.session.save()
      return res.redirect('http://localhost:3000/callback');
      //return res.json({token: spotifyReponse.access_token});
    }
  },

  async login(req, res){
    if (req.session.userId){
      return res.json({result: 'ERROR', message: 'User already logged in.'});
    }
    const params = req.body;
    const userInfo = await user.login(params);
    if (userInfo){
      console.log(userInfo);
      req.session.userId = userInfo.id;
      //test = user.spotauthorize(res);
      console.log("user " + req.session.userId + " logged in")
    }
  },

  async logout(req, res){
    if (req.session.userId){
      delete req.session.userId
      return res.json({result:'SUCCESS'})
    }

    return res.json({result: 'ERROR', message: 'User is not logged in.'});
  }
}