const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

export const workoutValidation = (workout) => {
    const schema = 
        {
            name: Joi.string().min(2).max(24).required(),
            user_id: Joi.objectId().required(),
            setCards: Joi.array().items({
                setCard_id: Joi.objectId().required()
            }),
            keywords: Joi.array()
                .items({
                    keyword: Joi.string().min(2).max(24).required()
                })
        }
    return Joi.validate(workout, schema)
}