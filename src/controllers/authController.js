const _ = require('lodash')
const bcrypt = require('bcrypt')
import {User} from '../models/userModel'
import { authValidation } from '../validators/authValidation';

export const authRequest = async (req, res) => {
    // console.log(req.body)
    const {error} = authValidation(req.body)
    if(error) {
        return res.status(400).send({success: false})
    }

    let user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.status(400).send({success: false})
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
        return res.status(400).send({success: false})
    }

    const token = user.generateAuthToken()
    res.send({token: token, user: user})
    // console.log({token: token, user: user, success: true})
}
