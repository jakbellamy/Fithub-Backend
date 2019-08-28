const _ = require('lodash')
const bcrypt = require('bcrypt')
import {SetCard} from '../models/setCardModel'
import { setCardValidation } from '../validators/setCardValidation';

export const addNewSetCard = async (req, res) => {

    const {error} = setCardValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let setCard = await SetCard.findOne({name: req.body.name})
    if(setCard) return res.status(400).send('setCardname taken')
    
    setCard = new SetCard(_.pick(req.body, ['name', 'keywords', 'sets', 'user_id']))
    await setCard.save()

    res.send(_.pick(setCard, ['_id', 'name', 'keywords', 'sets', 'user_id']))
}

export const getSetCards = (req, res) => {
    SetCard.find({}, (err, setCard) => {
        if (err) {
            res.send(err)
        }
        res.json(setCard)
    })
}

export const getSetCardWithID = (req, res) => {
    SetCard.findById(req.params.setCardId, (err, setCard) => {
        if (err) {
            res.send(err)
        }
        res.json(setCard)
    })
}

export const updateSetCard = (req, res) => {
    SetCard.findOneAndUpdate({ _id: req.params.setCardId}, req.body, { new: true }, (err, setCard) => {
        if (err) {
            res.send(err)
        }
        res.json(setCard)
    })
}

export const deleteSetCard = (req, res) => {
    SetCard.remove({ _id: req.params.setCardId }, (err, setCard) => {
        if (err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted setCard'})
    })
}