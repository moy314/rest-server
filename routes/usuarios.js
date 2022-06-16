const { Router } =  require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');

const { 
  usuariosGet, 
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)



  router.put('/:id',usuariosPut )


  router.post('/',// agregando validaciones de correo.
  check('nombre','el nombre no puede ser una cadena vacía').not().isEmpty(),//aqui se hace la validacion. estas cosas son middlewares
  check('correo','el correo no es válido').isEmail(),
  check('password','el password debe terner al menos 6 caracteres').isLength({min:6}),
  check('rol',' no es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  validarCampos
  ,usuariosPost)


  router.delete('/',usuariosDelete )

  router.patch('/',usuariosPatch )
  



module.exports = router;