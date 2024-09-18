const express = require('express')
const cors = require('cors')
const { dbConection } = require('../db/config')



class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        // conectando base de datos
        this.conectarDb()

        // middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }


    async conectarDb(){
        await dbConection()
    }

    middlewares(){        
        // Directorio Publico
        this.app.use( express.static('public') )
        // Cors
        this.app.use(cors())

        // Parseo y Lectura de informacio:
        this.app.use(express.json())
    }


    routes(){
       this.app.use( this.authPath, require('../routes/auth'))
       this.app.use( this.usuariosPath, require('../routes/usuarios'))

    }

    
    listen(){
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
        
    }



}


module.exports = Server