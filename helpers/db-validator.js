const Role      = require('../models/role');
const Usuario   = require('../models/usuario');


const esRolValido   = async(rol = '')=>{
    const existeRol = await Role.findOne({ rol });

    if(!existeRol){
      throw new Error(`el rol ${ rol } no está registrado en la base de datos`);
    }

  }


//VALIDACION DE CORREO
const emailExiste = async( correo = '' ) => {

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if ( existeEmail ) {
      throw new Error(`El correo: ${ correo }, ya está registrado`);
  }
}



const existeUsuario = async( id ) => {

  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
      throw new Error(`El id: ${ id } no existe`);
  }
}






    





  module.exports = {
    esRolValido,
    emailExiste,
    existeUsuario

}