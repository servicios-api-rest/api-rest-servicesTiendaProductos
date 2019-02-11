'use strict'

const mogoose =require('mongoose')
const connect =  require('../../../database/collections/connect')
const Registro = require('../../../database/collections/users')

const express = require('express')

const route = express.Router()

//////////// metodos de peticion GET, POTS, PUT, DELETE///////////////////////////////

route.get('/', (req, res) =>{
    res.status(200).send({ message:'Service api-rest Product Store'})
})




route.get('/registro',(req, res, next)=>{

});

//registro de usuarios
route.post('/registro', (req, res) =>{
    console.log('POST /api/registro')
    console.log(req.body)

    let registro = new Registro()
    registro.name = req.body.name
    registro.lastname = req.body.lastname
    registro.phone = req.body.phone
    registro.email = req.body.email
    registro.password = req.body.password
    registro.role = req.body.role

    Registro.findOne({'email':registro.email},(err,e)=>{
        if(e){
            console.log('email repetido')
            res.status(404).send({message:`Este email ${registro.email} ya se encuentra registrado`})
        }
        else{
            registro.save((err, usertStored) =>{
                if(err) {
                  res.status(404).send({messaje: `Error al salvar la base de datos:${err}`})
                 console.log(err)
                }
                res.status(200).send(usertStored)
            })
        }

        //res.status(404).send
    })
})


route.get('/list/:email', (req, res) =>{
    //res.send({ email:`${req.params.email}`,password:`${req.params.pass}`})
    console.log(req.params)
    let email =req.params.email

    Registro.find({"email":email}, (err, user) =>{
        if(err) return res.status(500).send({menssage:`Error en la peticion: ${err}`})
        if(!user) return res.status(404).send({message:`usuario no existe`})

        res.status(200).send({'email':user})
    })
})

//---------------signin----------------------------

route.get('/login/:email=:password', (req, res) =>{
    //res.send({ email:`${req.params.email}`,password:`${req.params.pass}`})
    console.log(req.params)

    let email = req.params.email
    let password = req.params.password

    Registro.find({"email":email,"password":password}, (err, user) =>{
        if(err) return res.status(500).send({menssage:`Error en la peticion: ${err}`})
        if(user.length == 0) return res.status(404).send({message:`Email o Clave Incorrectos`})
        res.status(200).send({'email':user})
    })
})



route.post('/login2', (req, res) =>{
    //res.send({ email:`${req.params.email}`,password:`${req.params.pass}`})
    console.log(req.body)

    let email = req.body.email
    let password = req.body.password

    Registro.find({"email":email,"password":password}, (err, user) =>{
        if(err) return res.status(404).send({menssage:`Error en la peticion: ${err}`})
        if(user.length == 0) return res.status(404).send({message:`Email o Clave Incorrectos`})
        //if(user.email != email) return  res.status(404).send({message:'email no encontrado'})
        //if(user.password != password ) return res.status(404).send({message:'passqword incorrecto'})
        res.status(200).send(user)
    })
})





//-----------Editar roles de usuario------------------------------
route.get('/editrole/:email=:password=:role', (req, res, next)=>{
//console.log(req.params)

    
    let email = req.params.email
    let password = req.params.password
    let role = req.params.role

    console.log(':::::::'+role)

    Registro.find({"email":email,"password":password},(err, user) =>{
        if(err) return res.status(500).send({menssage:`Error en la peticion: ${err}`})
        if(user.length == 0) return res.status(404).send({message:`usuario no existe o no tiene privilegios de administrador`})
        
            
        var id=user[0]._id
        var name=user.name
        
        Registro.findByIdAndUpdate(id, {role:role}, (err, doc) => {
            //console.log(user[0]._id)
            //console.log('::::::'+res);
            console.log(doc)
            if(err) {
              res.status(500).json({
                "msn": "Error no se pudo actualizar los datos"
              });
              return;
            }
            
            res.status(200).send({email, role})
            
        });
        
       
    })  
});


///purreba para consumir esto datos 
route.get('/user', (req, res, next)=>{

    Registro.find({}, (err, user)=>{

    var user2= user.map(u=>{
            return ({
                id:u.id,
                name:u.name,
                lastname:u.lastname,
                password:u.password,
                email:u.email,
                role: u.role
            })
        })
        

        res.status(200).send(user2);
    })
});





module.exports = route
