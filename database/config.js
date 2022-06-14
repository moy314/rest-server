const mongoose = require('mongoose');


const dbConnnection = async() =>{

        try {
            
            await mongoose.connect(process.env.MONGODB_CNN,{
                // useNewUrlParser: true,
                // useUnifiedTopology:true,
                // useCreateIndex:true,
                // useFindAndModify:false

            })

            console.log("base de datos conectada");

        } catch (error) {
            console.log(error)
            throw new Error('error al iniciar base de datos');

        }



}


module.exports = {

    dbConnnection
}