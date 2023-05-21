const { Posts } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let posts = await Posts.findAll({
            include:{
                association: 'Scores',
                attributes:['score']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: posts
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.post_id;
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
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};


const create = async (req, res) => {
    try {
        const dataPosts = req.body;
        await Posts.sync();
        let createPost = await Posts.create({
            title: dataPosts.title,
            content: dataPosts.content,
        });
        res.status(201).json({
            ok: true,
            statu:201,
            body: "Created Post"
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.post_id;
        const dataPosts = req.body;
        let updateRole = await Roles.update({
            title: dataPosts.title,
            content: dataPosts.content,
        }, {
            where: {
                id:id
            }
        });
        return res.status(201).json({
            ok: true,
            statu:200,
            body: updatePost
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const deletePosts = async (req, res) => {
    try {
        const id = req.params.post_id;
        let deleteRole = await Roles.destroy({
            where: {
                id:id
            }
        });
        return res.status(200).json({
            ok: true,
            statu:200,
            body: deleteRole
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
   update,
   deletePosts
}
