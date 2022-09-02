const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id_provedor: {
        type: String,
        require: true,
    },
    id_cliente: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    data_servico: {
        type: Date,
        require: true,
    },
    data_postagem:{
        type: Date,
        default: Date.now,
    },
    descricao: {
        type: String,
        require: true,
    },
    valor: {
        type: Number,
        require: true,
    },
    valor_pago: {
        type: Number,
    },
    nome_cliente: {
        type: String,
        require: true,
    },
    nome_provedor: {
        type: String,
        require: true,
    },
    endereco_cliente: {
        type: String,
        require: true,
    },

},
{
    collection: 'service'
},);


module.exports = mongoose.model('Service', UserSchema)