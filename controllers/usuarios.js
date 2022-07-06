const { response,request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
// const emailExiste = require('')


 
const usuariosGet =  (req, res = response)  => {

    const {q,nombre = "no name",apekey} = req.query;

    res.json(
        {
        ok:true,
        msg:"GET API - controlador",
        q,nombre,apekey
        }

    );
  }



  const usuariosPut =  async(req, res = response) => {

    const id = req.params.id;
    const { _id,password,google,correo,...resto} = req.body;

    //TODO: validar contra BD

      if(password){
        //encriptar contraseña
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password,salt);
      
      
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json(
        {
        ok:true,
        msg:"PUT API - controlador",
        id,
        usuario,
        


        
        }

    );
  }


  const usuariosPost =  async(req, res = response) => {
   
    

            //NO CONFIAR EN LA PERSONA QUE HACE EL FRONTEND
            //aquí solo estamos desestructurando lo que nos interesa. No debemos recibir el campo google para que no pueda ser modificado
      const {nombre,correo,password,rol} = req.body;
      const usuario = new Usuario({nombre,correo,password,rol});//creando nueva instancia del usuario
      //con lo de arriba sólo se crea la instancia pero no se está guardando:
     

     


      //encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password,salt);

     
     
     
     
     //guardar en base de datos
      await usuario.save();

      res.json({
        usuario
      });


      // res.status(201).json(
      //   {
      //   ok:true,
      //   msg:"POST API - controlador",
      //   usuario
        
      //   }

    
}


const usuariosDelete =  (req, res = response) => {
    res.json(
        {
        ok:true,
        msg:"DELETE API - controlador"
        
        }

    );
  } 
  
const usuariosPatch  =  (req, res = response) => {
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