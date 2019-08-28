const _ = require('lodash')
const bcrypt = require('bcrypt')
import {User} from '../models/userModel'
import { authValidation } from '../validators/authValidation';

export const authRequest = async (req, res) => {
    const {error} = authValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({username: req.body.username})
    if(!user) return res.status(400).send('Invalid username or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid username or password')

    const token = user.generateAuthToken()
    res.send(token)
}
