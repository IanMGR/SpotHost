const track = require("../model/track");

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async current(req, res){
    console.log(req.session)
    trackInfo = await track.getCurrent(req.session.spotifyToken);
    console.log(trackInfo)
    req.session.trackInfo = trackInfo;
    return res.json(trackInfo)
  },

  async playTrack(req, res){
    response = await track.setTrack(req.session.spotifyToken, req.session.trackInfo);
    return res.json(response)
  }

}