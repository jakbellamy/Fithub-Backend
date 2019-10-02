const _ = require('lodash')
const bcrypt = require('bcrypt')
import {User} from '../models/userModel'
import { authValidation } from '../validators/authValidation';

export const authRequest = async (req, res) => {
    const {error} = authValidation(req.body)
    if(error) {
        return res.send({msg: error.details[0].message, success: false})
    }

    let user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.send({msg: "User Doesn't Exist", success: false})
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) {
        return res.send({msg: 'Invalid Password', success: false})
    }

    const token = user.generateAuthToken()
    res.send({token: token, user: user, success: true})
    console.log({token: token, user: user})
}
