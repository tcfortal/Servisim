const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senhaHash:{
        type: String,
        required: true
    },
    telefone:{
        type: Number,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    data_nascimento:{
        type: Date,
        required: true,
    },
    endereco:{
        type: String,
        required: true,
    },
    cidade:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
    },
    emailVerificado: {
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

}, 
{
    collection: 'person'
},);


module.exports = mongoose.model('Person', UserSchema)