const express = require('express')



class server{

    constructor(){

        this.app = express();
        this.routes();
        this.port = process.env.PORT;

    }
        routes(){
            this.app.get('/', function (req, res) {
            res.send('Hello World');
          })

        }


        listen(){

            this.app.listen(this.port,() =>{

                console.log("servidor corriendo en el puerto " , this.port);
            })

        }
      
   

    }




module.exports = server; 