
const { Router } = require('express')
const { check } = require('express-validator');

const { usuriariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPath,
        rutaPrueba } = require('../controllers/usuarios');

const {validarCampos, validarJWT, tieneRol, esAdminRole} = require('../middlewares/index')

const { esRolValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');


const router = Router()




router.get ("/prueba", rutaPrueba)

router.get   ('/', usuriariosGet);

router.put   ('/:id', [
        check('id', 'EL ID ENVIADO NO ES UN ID VALIDO').isMongoId(),
        check( 'id' ).custom(usuarioExistePorId),
        check('rol').custom( esRolValido ),
        validarCampos
],usuariosPut)

router.post  ('/', [
        check('nombre', 'EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
        check('password', 'EL PASSWORD DEBE SER DE 6 LETRAS').isLength({min: 6}),
        check('correo', 'EL CORREO NO ES VALIDO').isEmail(),
        // check('rol', 'EL ROL NO ES VALIDO').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo').custom( emailExiste ),
        // check('rol').custom( esRolValido ),
        validarCampos
] ,usuariosPost );

router.delete('/:id' ,[
        validarJWT,
        // esAdminRole,
        tieneRol( 'VENTAS_ROL', 'ADMIN_ROLE'),
        check('id', 'no es un usuario valido' ).isMongoId() ,
        check('id').custom(usuarioExistePorId ),
        validarCampos
] , usuariosDelete);

router.patch ('/', usuariosPath );



module.exports = router