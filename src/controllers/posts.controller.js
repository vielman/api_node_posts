const { Posts } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let posts = await Posts.findAll();
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
        const id = req.params.rol_id;
        let post = await Posts.findOne({
            where: {
                id:id
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

module.exports = {
   findAll,
   findOne
}
