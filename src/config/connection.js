const mongoose = require('mongoose');

//mongodb+srv://admin:<password>@cluster0.azubg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority

function connection(){
    let usuario = process.env.NODE_USER
    let senha = process.env.NODE_PASS

    if(process.env.NODE_ENV!=='producao'){
        require('dotenv').config();
        usuario = process.env.NODE_USER
        senha = process.env.NODE_PASS
    }else{
        usuario = process.env.NODE_USER
        senha = process.env.NODE_PASS
    }
    const URL = `mongodb+srv://${usuario}:${senha}@cluster0.azubg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`


    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    const db = mongoose.connection;

    db.on('error',()=>{
        console.log('ERRO DE CONEXÃO!');
    });

    db.on('open',()=>{
        console.log('CONEXAO COM SUCESSO!')
    });


};

connection()
