const { Posts } = require('../models/index');
const { Audits } = require('../models/index');
const { createAudit } = require('./audits.controller');
const { schemaPostFields, schemaVadidatId, schemaDateRange, schemaPostdelete} = require('../middleware/vaidation');
const { Op } = require('sequelize');

const findAll = async (req, res) => {
    try {
        let posts = await Posts.findAll({
            include:{
                association: 'Scores',
                attributes:['score']
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: posts
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const findByDateRange = async (req, res) => {
    try {
        const { error } = schemaDateRange.validate({from_date:req.params.from_date, to_date:req.params.to_date});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        let startedDate =  new Date(req.params.from_date);
        let endDate = new Date(req.params.to_date);
        let posts = await Posts.findAll({
            where: {
                "createdAt" : {[Op.between] : [startedDate , endDate ]}
            },
            include:{
                association: 'Scores',
                attributes:['score']
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: posts
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};


const findOne = async (req, res) => {
    try {
        const id = req.params.post_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        let post = await Posts.findOne({
            where: {
                id:id
            },
            include:{
                association: 'Scores',
                attributes:['score']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: post
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};


const create = async (req, res) => {
    try {
        if (req.user.rol_name !== "Publisher") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be Publisher"});
        }
        const dataPosts = req.body;
        var { error } = schemaPostFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        await Posts.sync();
        let createPost = await Posts.create({
            title: dataPosts.title,
            content: dataPosts.content,
        });
    
        await createAudit("Create", createPost.id, req.user.id);

        res.status(201).json({
            ok: true,
            statu:201,
            body: "Created Post"
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const update = async (req, res) => {
    try {
        if (req.user.rol_name !== "Publisher") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be Publisher"});
        }

        const id = req.params.post_id;
        if (!id || error) {
            return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });
        }

        var { error } = schemaPostFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        const dataPosts = req.body;
        let updatePost = await Posts.update({
            title: dataPosts.title,
            content: dataPosts.content,
        }, {
            where: {
                id:id
            }
        });

        await createAudit("Update", id, req.user.id);

        return res.status(201).json({
            ok: true,
            statu:200,
            body: updatePost
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const deletePosts = async (req, res) => {
    try {
        if (req.user.rol_name !== "Publisher") {
            return res.status(400).json({ ok: false, statu:400, body: "Access denied must be Publisher"});
        }

        const id = req.params.post_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

        const dataPosts = req.body;
        let deletePost = await Posts.destroy({ where: { id:id } });

        await createAudit("Delete", id, req.user.id);

        return res.status(200).json({
            ok: true,
            statu:200,
            body: deletePost
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
   update,
   deletePosts,
   findByDateRange
}
