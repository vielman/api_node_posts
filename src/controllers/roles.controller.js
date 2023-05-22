const { Roles } = require('../models/index');
const { schemaRoleFields, schemaVadidatId} = require('../middleware/vaidation');

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.rol_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const create = async (req, res) => {
    try {
        const dataRoles = req.body;
        var { error } = schemaRoleFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.rol_id;
        if (!id || error) {
            return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });
        }

        var { error } = schemaRoleFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

module.exports = {
   findAll,
   findOne,
   create,
   update
}
