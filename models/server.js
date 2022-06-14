const express = require('express');
const Cors = require('cors');
const { dbConnnection } = require('../database/config');



class server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.pathUsuarios = '/api/usuarios';

        //conectar base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();
        
        //rutas
        this.routes();

    }

        async conectarDB(){

            await dbConnnection();
        }

        routes(){


            this.app.use(this.pathUsuarios,require('../routes/usuarios'));
            

        }


        listen(){

            this.app.listen(this.port,() =>{

                console.log("servidor corriendo en el puerto " , this.port);
            })

        }
      

        middlewares(){
            //directorio publico
            this.app.use(express.static('public'));//para renderizar los archivos de la carpeta public
            //CORS
            this.app.use(Cors());
            //lectura y parseo del body
            this.app.use(express.json());//js object notation

        }
   

    }




module.exports = server; 