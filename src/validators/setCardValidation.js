const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

export const setCardValidation = (setCard) => {
    const schema = 
        {
            name: Joi.string().min(2).max(24).required(),
            user_id: Joi.objectId().required(),
            keywords: Joi.array()
                .items({
                    keyword: Joi.string().min(2).max(24).required()
                }),
            sets: Joi.array()
                .items({
                    name: Joi.string().min(2).max(24).required(),
                    type: Joi.bool().required(),
                    reps: Joi.number().when('type', {
                        is: true,
                        then: Joi.number().min(1).max(200).required()
                    }),
                    time: Joi.number().when('type', {
                        is: false,
                        then: Joi.number().min(1).max(5000).required()
                    })
                })
        }
    return Joi.validate(setCard, schema)
}