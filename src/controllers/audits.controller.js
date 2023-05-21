const { Audits } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let audits = await Audits.findAll({
            include:{
                association: 'Posts',
                attributes:['title', 'content']
            },
            include:{
                association: 'Users',
                attributes:['name', 'email']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: audits
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.audit_id;
        let audit = await Audits.findOne({
            where: {
                id:id
            }, 
            include:{
                association: 'Posts',
                attributes:['title', 'content']
            },
            include:{
                association: 'Users',
                attributes:['name', 'email']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: audit
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const create = async (action, post_id, user_id) => {
    try {
        await Audits.sync();
        let createAudit = await Audits.create({
            action,
            post_id,
            user_id,
        });
        return {
            ok: true,
            statu:201,
            body: "Created Audits"
        };
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};


module.exports = {
   findAll,
   findOne,
   create
}
