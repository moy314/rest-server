const { Rsponse } = require('express');

const usuariosGet =  (req, res = Response)  => {

    const {q,nombre = "no name",apekey} = req.query;

    res.json(
        {
        ok:true,
        msg:"GET API - controlador",
        q,nombre,apekey
        }

    );
  }



  const usuariosPut =  (req, res = Response) => {

    const id = req.params.id;

    res.json(
        {
        ok:true,
        msg:"PUT API - controlador",
        id
        
        }

    );
  }


  const usuariosPost =  (req, res = Response) => {

      const body = req.body;
      res.status(201).json(
        {
        ok:true,
        msg:"POST API - controlador",
        body
        
        }

    );
}


const usuariosDelete =  (req, res = Response) => {
    res.json(
        {
        ok:true,
        msg:"DELETE API - controlador"
        
        }

    );
  } 
  
const usuariosPatch  =  (req, res = Response) => {
    res.json(
        {
        ok:true,
        msg:"PACTCH API - controlador"
        
        }

    );
  } 
  


  module.exports = {
    usuariosGet,
    usuariosPut,      
    usuariosPost,      
    usuariosDelete,
    usuariosPatch       
}