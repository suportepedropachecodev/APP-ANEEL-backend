const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    distibuidora: String,
    codigo:String,
    titular:String,
    classe:String,
    subgrupo:String,
    modalidade:String,
    credito:String,
    municipio:String,
    uf:String,
    cep:String,
    data:String,
    tipo:String,
    fonte:String,
    potencia:String
});

const dadosaneel = mongoose.model('dadosaneel', schema);

module.exports = dadosaneel;