const {response, request} = require('express')
const {Usuario} = require('../models/usuarioss')
const bcryptjs = require('bcryptjs')



const rutaPrueba = async(req =Request, res=Response) => {

    body = req.body

    res.json({
        msg: "Hola mundo",
        body
    })

}


const usuriariosGet = async (req = request, res = response) => {
   
    // const {q, nombre = "no nombre", apikey, page = 1, limit} = req.query
    const { limite = 5, desde = 0 } = req.query
    
    // const usuarios = await Usuario.find( {estado: true} )
    //     .limit(Number(limite))
    //     .skip(Number(desde))

    // const total = await Usuario.countDocuments( {estado: true} )

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( {estado: true} ),
        Usuario.find( {estado: true} )
            .limit(Number(limite))
            .skip(Number(desde))
    ]) 
   
    res.json({
        // resp
       total,
       usuarios
    })
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { password, google, correo, ...resto  } = req.body

    // TODO VALIDAR CONTRA BASE DE DATOS

    if (password) {
        const salt = bcryptjs.genSaltSync();   
        resto.password = bcryptjs.hashSync(password, salt); 
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto , { new: true } );
        


    res.status(200).json({
        ok: true,        
        usuario
    })
}


const usuariosPost = async (req, res = response) => {
 
    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol} )
   
    // verificar correo
  
    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();   
    usuario.password = bcryptjs.hashSync(password, salt);    
    await usuario.save()
    

    res.status(201).json({
        ok: true,
        msg: 'USUARIOCREADO',        
        usuario
    })
}


const usuariosPath = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - controllador'
    })
}
 

const  usuariosDelete= async (req= request, res = response) => {

    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate( id , { estado :  false })
    
   

    res.json({
        msg: "Usuario eliminado",
        usuario: usuario       
    })
}


module.exports = {
    usuriariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete,
    rutaPrueba

}