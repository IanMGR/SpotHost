class Room {
  constructor(room) {
    this.id = room.id;
    this.dscr = room.dscr;
    this.code = room.code;
    this.hostId = room.hostId;
  }
}

const request = require('request');

exports.getHostRooms = function (user_id) {
  return new Promise(resolve => {
    const rooms = [];
    let sql = "SELECT * FROM room where host_id = " + user_id;
    let i = 0;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        rooms[i] = new Room(result[i]);
        i++;
      });
      resolve(rooms);
    });
  });
};

exports.create = function (description,user_id) {
  return new Promise(resolve => {
    let sql = "INSERT INTO room VALUES (null,'" + description + "', null, null," + user_id + ")" ;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.remove = function (id, user_id) {
  return new Promise(resolve => {
    let sql = "DELETE FROM room WHERE id = " + id + " AND host_id = " + user_id;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.update = function (room,user_id) {
  return new Promise(resolve => {

    let sql = "UPDATE room SET dscr = '" + room.dscr + " WHERE host_id = " + user_id;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.updateTrack = function (trackInfo,user_id) {
  return new Promise(resolve => {
    const track_info = trackInfo.replace("'","\\'");

    let sql = `UPDATE room SET track_info = '${track_info}' WHERE host_id = ${user_id}`;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.validation = function (code) {
  return new Promise (resolve => {
    let sql = "SELECT id FROM room WHERE code = " + code;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        console.log('Código inválido!');
        resolve(err)
      }
      else{
        resolve(result[0]);
      }
    })
  });
};