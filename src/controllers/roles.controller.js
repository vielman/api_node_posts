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

const create = async (req, res) => {
    try {
        const dataRoles = req.body;
        await Roles.sync();
        let createRole = await Roles.create({
            name: dataRoles.name,
            options: dataRoles.options,
        });
        res.status(201).json({
            ok: true,
            statu:201,
            body: "Created Role"
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.rol_id;
        const dataRoles = req.body;
        let updateRole = await Roles.update({
            name: dataRoles.name,
            options: dataRoles.options,
        }, {
            where: {
                id:id
            }
        });
        return res.status(201).json({
            ok: true,
            statu:200,
            body: updateRole
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

module.exports = {
   findAll,
   findOne,
   create,
   update
}
