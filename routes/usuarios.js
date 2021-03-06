const { Router }                    = require('express');
const { check }                     = require('express-validator');
const { validarCampos }             = require('../middlewares/validar-campos');
const { esRolValido,emailExiste,existeUsuario }   = require('../helpers/db-validator');

 


const { 
  usuariosGet, 
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)



  router.put('/:id',[

    check('id',"El id no es válido,perrín").isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom( esRolValido ),
    validarCampos

  ],usuariosPut )


  router.post('/',[// agregando validaciones de correo.
  check('nombre','el nombre no puede ser una cadena vacía').not().isEmpty(),//aqui se hace la validacion. estas cosas son middlewares
  check('password','el password debe terner al menos 6 caracteres').isLength({min:6}),
  // check('rol',' no es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('correo','el correo no es válido').isEmail(),
  check('correo').custom(emailExiste),                      
  check('rol').custom( esRolValido ),//verificacion personalizada. se agrega la cadena vacia por si el rol no se envia en el req, la cadena vacía choque con la validacion
  //(rol) => esRolValido(rol)
  validarCampos
],usuariosPost)


  router.delete('/:id',[
    check('id',"El id no es válido,perrín").isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos


  ],usuariosDelete )

  router.patch('/',usuariosPatch )
  



module.exports = router;