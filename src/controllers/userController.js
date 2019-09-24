
const bcrypt = require('bcrypt')
import {User} from '../models/userModel'
let _ = require('lodash');
import { userValidation } from '../validators/userValidation';

export const addNewUser = async (req, res) => {

    const {error} = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({username: req.body.username})
    if(user) return res.status(400).send('username taken')

    user = new User(_.pick(req.body, ['name', 'username', 'password']))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'name',]))
}

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const getUserWithID = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId}, req.body, { new: true }, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

export const deleteUser = (req, res) => {
    User.remove({ _id: req.params.userId }, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted user'})
    })
}