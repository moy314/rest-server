const { response,request } = require('express');
const bcrypt               = require('bcryptjs');
const Usuario              = require('../models/usuario');
// const emailExiste = require('')


 
const usuariosGet =  async(req = request, res = response)  => {
    const {limite = 5,desde = 0 } = req.query;
    // const query = {estado:false}
    // const {q,nombre = "no name",apekey} = req.query;
    // const usuarios = await Usuario.find(query)
    // .skip( Number(desde) )
    // .limit( Number(limite) );

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(),
      Usuario.find()
     .skip( Number(desde) )
     .limit( Number(limite) )
    ]) ;
    res.json(
        {
          total,
          usuarios
        

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
      const {nombre,correo,password,rol,estado} = req.body;
      const usuario = new Usuario({nombre,correo,password,rol,estado});//creando nueva instancia del usuario
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


const usuariosDelete =  async(req, res = response) => {
    const { id }  = req.params;

    //borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id); 

    //actualizar estado 
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

  
    res.json(
        {
          usuario
        
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