const cheerio = require('cheerio');
const axios = require('axios');

const totpaginas = async (url)=>{
    let inteiro = 0;
    await axios.get(url)
    .then(function(response){
        let html = response.data;
        const $ = cheerio.load(html);
        let totaldeusinas = $('body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(3) > tbody > tr.linhaBranca > td:nth-child(2)').text().trim();
        inteiro = Math.round(totaldeusinas)
        //console.log(inteiro);
    })
};
module.exports = totpaginas;