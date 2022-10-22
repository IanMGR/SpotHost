class Session {
  constructor(session) {
    this.id = session.id;
    this.user_id = session.user_id;
    this.track_info = session.track_info;
    this.spotify_token = session.spotify_token;
    this.spotify_id = session.spotify_id;
    this.room_code = session.room_code;
  }
}

const request = require('request');

exports.get = function (user_id) {
  return new Promise(resolve => {
    let sql = "SELECT * FROM session where user_id = " + user_id ;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
        let session = new Session(result[0]);
      resolve(session);
    });
  });
};

exports.create = function (session) {
  return new Promise(resolve => {
    const track_info = (session.track_info) ? "'" + session.track_info + "'" : 'null';
    const spotify_token = (session.spotify_token) ? "'" + session.spotify_token + "'" : 'null';
    const spotify_id = (session.spotify_id) ? "'" + session.spotify_id + "'" : 'null';
    const room_code = (session.room_code) ? "'" + session.room_code + "'" : 'null';

    let sql = "INSERT INTO session VALUES (null,'" + 
      session.user_id + "'," + 
      track_info + "," + 
      spotify_token + "," + 
      spotify_id + "," + 
      room_code + ")" ;

    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.remove = function (session) {
  return new Promise(resolve => {
    let sql = "DELETE FROM session WHERE id = " + session.id;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.update = function (session) {
  return new Promise(resolve => {
    const track_info = (session.track_info) ? "'" + session.track_info.replace("'","\\'") + "'" : 'null';
    const spotify_token = (session.spotify_token) ? "'" + session.spotify_token + "'" : 'null';
    const spotify_id = (session.spotify_id) ? "'" + session.spotify_id + "'" : 'null';
    const room_code = (session.room_code) ? "'" + session.room_code + "'" : 'null';

    let sql = `UPDATE session SET track_info = ${track_info}, spotify_token = ${spotify_token}, spotify_id = ${spotify_id}, room_code = ${room_code} WHERE id = ${session.id}`;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.checkUser = function (user_id) {
  return new Promise(resolve => {
    let sql = "SELECT count(id) num FROM session where user_id = " + user_id ;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      res = (result[0].num > 0)

      resolve(res)
    });
  });
};