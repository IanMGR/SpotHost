class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pswd = user.pswd;
    this.room = user.room;
    this.ishosting = user.ishosting;
  }
}

const request = require('request');
const randomstring = require("randomstring");

exports.login = function (user) {
  return new Promise(resolve => {
    let sql = "SELECT id from test where id = 1";// + user.pswd;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result[0]);
    })
  });
}

exports.spotauthorize = function (res) {
  return new Promise(resolve => {
    redirect_uri = global.baseUrl + 'user/callback';
    state = randomstring.generate(16);
    scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' + new URLSearchParams({
      response_type: 'code',
      client_id: global.client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }).toString());
    resolve(true);
  });
},

  exports.getspottoken = function (code) {
    return new Promise(resolve => {
      redirect_uri = global.baseUrl + 'user/callback';
      scope = 'user-read-private user-read-email';        
        
      request.post({
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(global.client_id + ':' + global.client_secret).toString('base64'))
        },
        json: true
      }, 
      function (err, res, body) {
        if (!err && res.statusCode === 200) {
          access_token = body.access_token;
          resolve({ 'access_token': access_token })
        }
        else {
          resolve({'error': err})
        }
      });
    });
  }