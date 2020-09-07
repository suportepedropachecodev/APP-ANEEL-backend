const scrap = require('./modules/scrap');
const consultausinas = require('./modules/consultausinas');
const classmongo = require('./modules/classmongo');

const urlconsulta = 'http://www2.aneel.gov.br/scg/gd/VerGD.asp?pagina=1&acao=buscar&login=&NomPessoa=&IdAgente=&DatConexaoInicio=&DatConexaoFim=';

async function main(url){
    await classmongo.start();
    let totalusinas = await consultausinas(url);//consulta na aneel
    let totalwusinas = await classmongo.contaregistros();//consulta na base
    
    if(totalwusinas==0){
        totalwusinas=1
    }
    console.log(`Dados Raspados: ${totalwusinas}`);
    console.log(`Dados na Aneel: ${totalusinas}`);

    if(totalwusinas >= totalusinas){
        console.log('Não há dados novos na aneel!')
        await classmongo.close()
    }else{
        let aserraspados = totalusinas - totalwusinas;
        for(let i = 0; i< aserraspados;i++){
            let urlsFilhos = `http://www2.aneel.gov.br/scg/gd/VerGD.asp?pagina=${i+1}&acao=buscar&login=&NomPessoa=&IdAgente=&DatConexaoInicio=&DatConexaoFim=`;
            await scrap(urlsFilhos);
        }
    }
}

main(urlconsulta);