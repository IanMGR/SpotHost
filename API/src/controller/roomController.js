const room = require("../model/room");

module.exports = {
  async index(req, res){
    return res.send('room controller');
  },

  async all(req, res){
    const user_id = req.session.userId;
    const response = await room.getHostRooms(user_id);
    return res.send(response);
  },

  async add(req, res){
    const info = req.body;
    const user_id = req.session.userId;
    const response = await room.create(info.dscr,user_id);
    return res.send(response);
  },
  
  async delete(req, res){
    const { id } = req.params;
    const user_id = req.session.userId;
    const response = await room.remove(id,user_id);
    return res.send(response);
  },

  async update(req, res){
    const info = req.body;
    const user_id = req.session.userId;
    const response = await room.update(info,user_id);
    return res.send(response);
  },

  async validate(req, res){
    const { code } = req.params;
    const response = await room.validation(code);
    return res.send(response);
  }

}