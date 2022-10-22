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
    } else {
      spotifyReponse = await user.getspottoken(code);
      spotifyId = await user.getSpotifyId(spotifyReponse.access_token);

      req.session.spotify_token = spotifyReponse.access_token;
      console.log(spotifyId)
      req.session.spotify_id = spotifyId;

      return res.redirect(global.webUrl);
    }
  },

  async login(req, res){
    const params = req.body;
    const userInfo = await user.validate(params);
    if (userInfo){
      req.session.user_id = userInfo.id
      req.session.user_name = userInfo.name
      req.session.track_info = '{"name": "none"}'
      console.log("user " + req.session.user_name + " logged in")
      return res.json({auth: 'Success!'})
    }
  },

  async getUser(req, res){
    console.log(req.session)
    req.session.user_id ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
  },

  async logout(req, res){
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Could not log out')
      } else {
        res.status(200).send({});
      }
    })
  }
}