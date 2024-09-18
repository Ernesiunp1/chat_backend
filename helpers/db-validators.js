
const Role =  require('../models/role')
const { Usuario } = require('../models/usuarioss')



const esRolValido =  async (rol = '') =>{
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la base de datos` )
    }
} 


const emailExiste = async ( correo = '' ) => {

       const existeEmail = await Usuario.findOne({correo});
        if (existeEmail) {
            throw new Error(`El correo ${ correo } ya esta registrado en la base de datos`)        
        }

}


const usuarioExistePorId = async ( id = '' ) => {

    const existeId = await Usuario.findById( id );
     if (!existeId) {
         throw new Error(`El id : ${ id } NO existe en la base de datos`)        
     }

}



    


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExistePorId
}