require('dotenv').config();
const { Users } = require('../models/index');
const { Roles } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { schemaLogin, schemaUserFields, schemaVadidatId } = require('../middleware/vaidation');

const findAll = async (req, res) => {
    try {
        if (req.user.rol_name !== "Admin") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be administrator"});
        }

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const findOne = async (req, res) => {
    try {
        if (req.user.rol_name !== "Admin") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be administrator"});
        }

        const id = req.params.user_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        let user = await Users.findOne({
            where: {
                id:id
            }, 
            include:{
                association: 'Rol',
                attributes:['name', 'options']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: user
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const create = async (req, res) => {
    try {
        if (req.user.rol_name !== "Admin") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be administrator"});
        }

        const { error } = schemaUserFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        const dataUsers = req.body;
        const salt = await bcrypt.genSalt(10);
        const user = await Users.findOne({where: {email: dataUsers.email}})
        if (user) {
           return res.status(200).json({
                ok: false,
                statu:200,
                body: "Email already Exists"
            });
        }
        const rol = await Roles.findByPk(dataUsers.rol_id)
        if (rol === null) {
           return res.status(200).json({
                ok: false,
                statu:200,
                body: "rol_id does not exist"
            });
        }
        const password = await bcrypt.hash(dataUsers.password, salt);
        await Users.sync();
        let createUser = await Users.create({
            email: dataUsers.email,
            password: password,
            name: dataUsers.name,
            rol_id: dataUsers.rol_id,
        });
        return res.status(201).json({
            ok: true,
            statu:201,
            body: "Created User"
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const update = async (req, res) => {
    try {
        if (req.user.rol_name !== "Admin") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be administrator"});
        }

        const id = req.params.user_id;
        var { error } = schemaVadidatId.validate({id});
        if (!id || error) {
            return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });
        }
        
        var { error } = schemaUserFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        const dataUsers = req.body;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(dataUsers.password, salt);
        let updateUser = await Users.update({
            email: dataUsers.email,
            password: password,
            name: dataUsers.name,
            rol_id: dataUsers.rol_id,
        }, {
            where: {
                id:id
            }
        });
        return res.status(201).json({
            ok: true,
            statu:200,
            body: updateUser
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const deleteUsers = async (req, res) => {
    try {
        if (req.user.rol_name !== "Admin") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be administrator"});
        }

        const id = req.params.user_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        let deleteUser = await Users.destroy({
            where: {
                id:id
            }
        });
        return res.status(200).json({
            ok: true,
            statu:200,
            body: deleteUser
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const signIn = async (req, res) =>{
    try {
        const { error } = schemaLogin.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        const dataUsers = req.body;
        const user = await Users.findOne({ 
            where:{ email: dataUsers.email 
            }, 
            include:{
                association: 'Rol',
                attributes:['name', 'options']
            }
        });

        if (!user) return res.status(400).json({ ok: false, statu:400, error: 'User not found' });
        
        const validPassword = await bcrypt.compare(dataUsers.password, user.password);
        if (!validPassword) return res.status(400).json({ ok: false, statu:400,error: 'Invalid password' });

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol_id: user.rol_id,
            rol_name: user.Rol.name,
            rol_options: user.Rol.options
        }, process.env.TOKEN_SECRET)

        res.header('auth-token', token).json({
            ok: true,
            statu:200,
            error: null,
            body: 'Success welcome',
            token: {token}
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
}

module.exports = {
   findAll,
   findOne,
   create,
   update,
   deleteUsers,
   signIn
}
