class User {
  constructor(user){
    this.id = user.id;
    this.name = user.name;
    this.pswd = user.pswd;
    this.islogged = user.islogged;
    this.room = user.room;
    this.ishosting = user.ishosting;
  }
}

exports.getStatus = function () {
  return new Promise(resolve => {
    let sql = "SELECT * FROM porcao_unica";
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.findById = function (id) {
  return new Promise(resolve => {
    let sql = "SELECT * FROM horario WHERE id = " + id;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      let horario = new Horario(result[0]);
      resolve(horario);
    });
  });
};

exports.login = function (user) {
  return new Promise(resolve => {
    let sql = "SELECT id from test where id = " + user.pswd;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve (result[0
      ]);
    })
  });
}