const { Scores } = require('../models/index');
const { schemaScoreFields, schemaVadidatId} = require('../middleware/vaidation');

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const findOne = async (req, res) => {
    try {
        const id = req.params.score_id;
        const { error } = schemaVadidatId.validate({id});
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

const create = async (req, res) => {
    try {
        const dataScores = req.body;
        var { error } = schemaScoreFields.validate(req.body);
        if (error) return res.status(400).json({ ok: false, statu:400, error: error.details[0].message });

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
      res.status(500).json({ ok: false, statu:500,msg: "Internal error on the server" });
    }
};

module.exports = {
   findAll,
   findOne,
   create
}
