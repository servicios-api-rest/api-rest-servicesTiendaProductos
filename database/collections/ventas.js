'use strict'

const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;



const ventaSchema = Schema({

    id_user: ObjectId,
    carrito: Array,
    signupDate: {type:Date, default:Date.now()}
    
});


module.exports = mongoose.model('ventas', ventaSchema )