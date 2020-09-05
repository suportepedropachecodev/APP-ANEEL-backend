const sitemodel = require('../model/dadosaneelschema');
const connection = require('../config/connection');
const mongoose = require('mongoose');


const classmongo = {
    start: async () => {
        connection()
    },
    add: async (dt) => {
        try {
            const novodado = new sitemodel({
                distibuidora: dt.distibuidora,
                codigo: dt.codigo,
                titular: dt.titular,
                classe: dt.classe,
                subgrupo: dt.subgrupo,
                modalidade: dt.modalidade,
                credito: dt.credito,
                municipio: dt.municipio,
                uf: dt.uf,
                cep: dt.cep,
                data: dt.data,
                tipo: dt.tipo,
                fonte: dt.fonte,
                potencia: dt.potencia
            });
            await novodado.save();

        } catch (error) {
            console.log('Não foi possivel salvar os dados! =>'+error)
        }
    },
    contaregistros: async ()=>{
        try {
            let nrdados = await sitemodel.find({}).countDocuments();
            let dadosraspados = Math.round(nrdados/1000);
            return dadosraspados
        } catch (error) {
            console.log('Problema na contagem dos dados! =>'+error)
        }
    },
    close: async()=>{
        await console.log('Fechando a conexão do BD!');
        await mongoose.connection.close();
    }
};

module.exports = classmongo;