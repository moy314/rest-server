const {Schema,model} = require('mongoose');

const RolSchema = Schema({

    rol:{
        type:String,
        required:[true,'El rol no es obligatorio']
    }
});

module.exports = model('Role',RolSchema);