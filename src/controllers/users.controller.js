const { Users } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let users = await Users.findAll({
            include:{
                association: 'Rol',
                attributes:['name', 'options']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: users
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.user_id;
        let user = await Users.findOne({
            where: {
                id:id
            }, 
            include:{
                association: 'Rol',
                attributes:['name', 'option']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: user
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

module.exports = {
   findAll,
   findOne
}
