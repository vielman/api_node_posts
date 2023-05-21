const { Scores } = require('../models/index');

const findAll = async (req, res) => {
    try {
        let scores = await Scores.findAll({
            include:{
                association: 'Posts',
                attributes:['title', 'content']
            }
        });
        res.status(200).json({
            ok: true,
            statu:200,
            body: scores
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.score_id;
        let score = await Scores.findOne({
            where: {
                id:id
            }, 
            include:{
                association: 'Posts',
                attributes:['title', 'content']
            }
        });
        console.log(score)
        res.status(200).json({
            ok: true,
            statu:200,
            body: score
        });
    } catch (err) {
      console.log(err)
      res.status(500).json({ ok: false, statu:500,msg: "Error interno en el servidor" });
    }
};

const create = async (req, res) => {
    try {
        const dataScores = req.body;
        await Scores.sync();
        let createScore = await Scores.create({
            score: dataScores.score,
            post_id: dataScores.post_id,
        });
        res.status(201).json({
            ok: true,
            statu:201,
            body: "Created Score"
        });
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
