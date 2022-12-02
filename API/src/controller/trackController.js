const track = require("../model/track");
const room = require("../model/room");
//const { parentPort } = require ("worker_threads")

module.exports = {
  async index(req, res){
    return res.send('user controller');
  },

  async current(req, res){
    trackInfo = await track.getCurrent(req.session.spotify_token);
    console.log(trackInfo)
    console.log(req.session)
    req.session.track_info = JSON.stringify(trackInfo)
    room.updateTrack(req.session.track_info, req.session.user_id)
    return res.json(trackInfo)
  },

  async playTrack(req, res){
    const { room_code } = req.params;
    roomTrack = await track.getRoomTrack(room_code, res)

    console.log(roomTrack.track_info)
    console.log(req.session)

    sessTrackInfo = JSON.parse(req.session.track_info);
    trackInfo = JSON.parse(roomTrack.track_info);

    console.log(sessTrackInfo.name + ' = ' + trackInfo.name)

    if(sessTrackInfo.name != trackInfo.name){
      response = await track.setTrack(req.session.spotify_token, trackInfo);
      req.session.track_info = JSON.stringify(trackInfo);
    }
    else{
      response = trackInfo
      console.log(response)
    }
    return res.json(response)
  }

}