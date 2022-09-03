const track = require("../model/track");

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async current(req, res){
    trackInfo = await track.getCurrent(req.session.spotifyToken);
    console.log(trackInfo)
    req.session.trackInfo = trackInfo;
    return res.json(trackInfo)
  }

}