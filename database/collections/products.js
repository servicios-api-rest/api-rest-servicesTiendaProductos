'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    name_p: String,
    marca_p: String,
    price_p: Number,
    description_p:String,
    signupDate: {type:Date, default:Date.now()}
})

//name, price y description la imagen no creo

module.exports = mongoose.model('products', productSchema) 