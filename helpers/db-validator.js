const Role      = require('../models/role');
const Usuario   = require('../models/usuario');


const esRolValido   = async(rol = '')=>{
    const existeRol = await Role.findOne({ rol });

    if(!existeRol){
      throw new Error(`el rol ${ rol } no está registrado en la base de datos`);
    }

  }


//VALIDACION DE CORREO
const emailExiste = async(email = '') =>{

    const existeEmail = await Usuario.findOne({email:email});
    if(existeEmail){
        throw new Error (`El correo ${email} ya está registrado`);
     
      }
    }

    





  module.exports = {
    esRolValido,
    emailExiste
}