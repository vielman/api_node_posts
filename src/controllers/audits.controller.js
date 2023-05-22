const { Audits } = require('../models/index');
const {schemaVadidatId} = require('../middleware/vaidation');

const findAll = async (req, res) => {
    try {
        let audits = await Audits.findAll({
            include:[{
                association: 'Posts',
                attributes:['title']
                },
                {
                association: 'Users',
                attributes:['name', 'email']
                }
            ]
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: audits
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.audit_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        let audit = await Audits.findOne({
            where: {
                id:id
            }, 
            include:[{
                association: 'Posts',
                attributes:['title']
                },
                {
                association: 'Users',
                attributes:['name', 'email']
                }
            ]
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: audit
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

async function createAudit(action, post_id, user_id) {
    try {
        await Audits.sync();
        let createAudit = await Audits.create({
            action,
            post_id,
            user_id,
        });
        return true;
    } catch (err) {
      console.log(err)
      return false;
    }
};


module.exports = {
   findAll,
   findOne,
   createAudit
}
