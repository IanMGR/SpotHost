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

exports.update = function (param) {
  return new Promise(resolve => {
    let temRequisicao;
    if (param == 1) {
      temRequisicao = "true";
    }
    else {
      temRequisicao = "false";
    }
    let sql = "UPDATE porcao_unica SET tem_requisicao = " + temRequisicao;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};