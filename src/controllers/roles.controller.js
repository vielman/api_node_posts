const { Roles } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let roles = await Roles.findAll();
        res.status(200).json({
            ok: true,
            statu:200,
            body: roles
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.rol_id;
        let rol = await Roles.findOne({
            where: {
                id:id
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: rol
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
