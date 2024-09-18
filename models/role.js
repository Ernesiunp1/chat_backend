

const {model, Schema} = require('mongoose')


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'EL ROL ES OBLIGATORIO']
    }

})



module.exports = model('Role', RoleSchema)