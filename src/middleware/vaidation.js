const Joi = require('joi');
 
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaUserFields = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    rol_id: Joi.number().required()
})

const schemaVadidatId = Joi.object({
    id: Joi.number().required()
})

const schemaScoreFields = Joi.object({
    score: Joi.number().required(),
    post_id: Joi.number().required()
})

const schemaPostFields = Joi.object({
    title: Joi.string().min(4).max(255).required(),
    content: Joi.string().min(1).max(2048).required()
})

const schemaRoleFields = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    options: Joi.string().min(4).max(1024).required()
})

const schemaDateRange = Joi.object({
    from_date: Joi.date().required(),
    to_date: Joi.date().required()
})
 
module.exports = {
    schemaLogin,
    schemaUserFields,
    schemaVadidatId,
    schemaPostFields,
    schemaRoleFields,
    schemaDateRange
}
