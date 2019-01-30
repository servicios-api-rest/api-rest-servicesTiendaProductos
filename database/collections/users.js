'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    lastname:String,
    phone:String,
    email: String,
    password: String,
    role: { type:String,
            enum: ['user', 'admin'],
            default:'user'
    },
    signupDate: {type:Date, default:Date.now()}
})


module.exports = mongoose.model('User', UserSchema) 