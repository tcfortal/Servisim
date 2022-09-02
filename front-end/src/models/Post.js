const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id_provedor: {
        type: String,
        require: true,
    },
    comentario: {
        type: String,
        require: true,
    },
    estrelas: {
        type: Number,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    

},
{
    collection: 'comments'
},);


module.exports = mongoose.model('Comment', UserSchema)