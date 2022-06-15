const { Rsponse,request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {validationResult} = require('express-validator');

const usuariosGet =  (req, res = Response)  => {

    const {q,nombre = "no name",apekey} = req.query;

    res.json(
        {
        ok:true,
        msg:"GET API - controlador",
        q,nombre,apekey
        }

    );
  }



  const usuariosPut =  (req, res = Response) => {

    const id = req.params.id;

    res.json(
        {
        ok:true,
        msg:"PUT API - controlador",
        id
        
        }

    );
  }


  const usuariosPost =  async(req, res = Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

      return res.status(400).json(errors);

    }

            //NO CONFIAR EN LA PERSONA QUE HACE EL FRONTEND
            //aquí solo estamos desestructurando lo que nos interesa. No debemos recibir el campo google para que no pueda ser modificado
      const {nombre,correo,password,rol} = req.body;
      const usuario = new Usuario({nombre,correo,password,rol});//creando nueva instancia del uduario
      //con lo de arriba sólo se crea la instancia pero no se está guardando:
     

      //verificar si el correo existe

      const existeEmail = await Usuario.findOne({correo});
      if(existeEmail){

        return res.status(400).json({

          msg:"El correo ya existe"
        })
      }



      //encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password,salt);

     
     
     
     
     //guardar en base de datos
      await usuario.save();




      res.status(201).json(
        {
        ok:true,
        msg:"POST API - controlador",
        usuario
        
        }

    );
}


const usuariosDelete =  (req, res = Response) => {
    res.json(
        {
        ok:true,
        msg:"DELETE API - controlador"
        
        }

    );
  } 
  
const usuariosPatch  =  (req, res = Response) => {
    res.json(
        {
        ok:true,
        msg:"PACTCH API - controlador"
        
        }

    );
  } 
  


  module.exports = {
    usuariosGet,
    usuariosPut,      
    usuariosPost,      
    usuariosDelete,
    usuariosPatch       
}