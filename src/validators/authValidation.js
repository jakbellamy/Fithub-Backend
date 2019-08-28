const Joi = require('joi')

export const authValidation = (user) => {
    const schema = {
        username: Joi.string().min(5).max(16).required(),
        password: Joi.string().min(6).max(1024).required()
    }
    return Joi.validate(user, schema)
}