const express = require('express');
const Cors = require('cors');



class server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        //middlewares
        this.middlewares();
        //rutas
        this.routes();

    }
        routes(){
            this.app.get('/api', function (req, res) {
            res.json(
                {
                ok:true,
                msg:"GET API"
                }

            );
          })



          this.app.put('/api', function (req, res) {
            res.json(
                {
                ok:true,
                msg:"PUT API"
                
                }

            );
          })


          this.app.post('/api', function (req, res) {
            res.status(201).json(
                {
                ok:true,
                msg:"POST API"
                
                }

            );
          })


          this.app.delete('/api', function (req, res) {
            res.json(
                {
                ok:true,
                msg:"DELETE API"
                
                }

            );
          })

        }


        listen(){

            this.app.listen(this.port,() =>{

                console.log("servidor corriendo en el puerto " , this.port);
            })

        }
      

        middlewares(){
            //directorio publico
            this.app.use(express.static('public'));
            this.app.use(Cors());

        }
   

    }




module.exports = server; 