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
 
module.exports = {
    schemaLogin,
    schemaUserFields,
    schemaVadidatId
}
