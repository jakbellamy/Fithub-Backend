import mongoose from 'mongoose' 
import { key } from '../../private/keys/jwtKey';
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: 
        {
            type: String,
            required: 'Enter Name',
            maxlength: 60
        },
    username: 
        {
            type: String,
            required: 'Enter a username',
            minlength: 5,
            maxlength: 16,
            lowercase: true,
            unique: 'username taken'
        },
    password: 
        {
            type: String,
            required: 'Enter a last name',
            minlength: 6,
            maslength: 1024
        }
})

UserSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id }, key)
  return token
}

export const User = mongoose.model('User', UserSchema)
