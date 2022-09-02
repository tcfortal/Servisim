const mongoose = require('mongoose')

const ProviderSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
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
    descricao:{
        type: String,
        required: true,
    },
    services: [
        { type: String,
            required: true }
    ],
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
    collection: 'services_provider'
},);

module.exports = mongoose.model('services_provider', ProviderSchema)