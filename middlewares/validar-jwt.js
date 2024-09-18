const { request, response } = require('express')
const jwt = require ('jsonwebtoken')

const {Usuario} = require('../models/usuarioss')


const validarJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe un token en la request'
        })
    }

    try {
               
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY)


        // buscando en base de datos el  usuario que corresponde al iud 
        const usuario = req.usuario = await Usuario.findById( uid )    
        
        if (!usuario) {
            return res.status(401).json({
                msg: "No se consiguio El Usuario, no existe en la DB  "
            })
            
        }
        

        // verificando que el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Estado False - El Usuario no existe en la DB "
            })
        }

        // creando en la request la propiedad usuario y seteandola como usuario de mongo
        req.usuario = usuario
        next();
        
        //  return


    } catch (error) {
        console.log("este es el error");
        console.log(error);
        res.status(401).json({
            msg: "TOKEN NO VALIDO"
        })

    }

    
    console.log(token);

    // next()

}


module.exports = {
    validarJWT
}