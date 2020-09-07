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
        while(totalwusinas <= totalusinas){
            let urlsFilhos = `http://www2.aneel.gov.br/scg/gd/VerGD.asp?pagina=${totalwusinas}&acao=buscar&login=&NomPessoa=&IdAgente=&DatConexaoInicio=&DatConexaoFim=`;
            //console.log(urlsFilhos)
            await scrap(urlsFilhos);
            totalwusinas++
        }
    }
}

main(urlconsulta);