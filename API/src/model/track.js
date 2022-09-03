class Track {
  constructor(track) {
    this.id = track.id;
    this.name = track.name;
    this.album = track.album;
    this.artist = track.artist;
    this.uri = track.uri;
    this.timestamp = track.timestamp;
  }
}

const request = require('request');

exports.getCurrent = function (token) {
  return new Promise(resolve => {

    request.get({
      url: 'https://api.spotify.com/v1/me/player/currently-playing?market=us',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      json: true
    }, 
    function (err, res, body) {
      if (!err && res.statusCode === 200) {
        artists = []
        for (const artist of body.item.artists){
          console.log(artist)
          artists.push(artist.name);
        }
        resolve({
          name: body.item.name,
          album: body.item.album.name,
          artists: artists,
          uri: body.item.uri,
          progress_ms: body.progress_ms
        })
      }
      else {
        resolve({'error': err})
      }
    });
  });
}