const {model, Schema} = require('mongoose')



const usuarioSchema = new Schema({
 
    nombre : {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo : {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    }, 
    password : {
        type: String,
        required: [true, 'El contraseña es requerido'],
    },
    img : {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado : {
        type: Boolean,
        default: true
    }, 
    google : {
        type: Boolean,
        default: false
    },      

})

usuarioSchema.methods.toJSON = function name(params) {
    
    const { __v, password, _id , ...usuario} =  this.toObject();
    usuario.uid = _id
    
    return usuario
}

const Usuario = model('Usuario', usuarioSchema);
module.exports = {
   Usuario 
} 

// module.exports = model('Usuario', usuarioSchema)