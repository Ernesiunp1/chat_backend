const { response, request } = require("express");
const bcryptjs = require('bcryptjs');


const {Usuario} = require('../models/usuarioss');
const { generarJWT } = require("../helpers/generar-jwt");




const login = async ( req = request, res = response ) => {

    const {correo, password} = req.body

    try {

        // Verificar que el email existe

        const usuarios = await Usuario.findOne( {correo} )
        if (!usuarios) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        
        // Verificar que el usuario esta activo
        if (!usuarios.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado false'
            })
        }
        
        // Verificar que la contraseña es correcta

        const validPassword = bcryptjs.compareSync(password, usuarios.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
            
        

        // Crear un token

        const token = await generarJWT( usuarios.id )


         res.json({
               usuarios,
               token
           
        })

        
    } catch (error) {
        console.log( error )
        return res.status(500).json({            
            msg: 'ALgo salio mal, hable con el administrador'
        })
    }
   


}

module.exports = {
    login
}