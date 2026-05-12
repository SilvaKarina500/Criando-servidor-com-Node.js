//Fazendo o requerimento/importação dos módulos HTTP e URL do node

const http = require('http');
const url = require('url');

// Criação do servidor
const server = http.createServer((req, res) =>{
    //Aqui estamos recebendo a URL e "quebrando" a mesma,
    //colocando como texto. 
    const urlCompleta = url.parse(req.url, true);

    console.log(urlCompleta);
    res.end('Veja o console');
});
server.listen(3000, () =>{
    console.log('Servidor rodando em http://localhost:3000');

});