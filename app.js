'use strict'
//
const IPWIFI = require('./database/collections/HOST')

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan');


const app = express()
app.use(cors());

app.use(morgan('dev'));
const port = process.env.PORT || 4030 

//const service = require('./routes/api/v1.0')
const service = require('./routes/api/v1.0/services')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//servicios del api-rset 
app.use('/api/v1.0/',service)
app.use(service)

app.listen(port, () => {
    console.log(`Api-rest store product run in ${IPWIFI}:${port}`) 
}) 

module.exports = app