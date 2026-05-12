const http = require('http');
const url = require('url');

// pathname = rota
// query = dados enviando pela URL

const server = http.createServer((req, res) =>{
    //Convertento a URL para texto
    const urlCompleta = url.parse(req.url, true);

    // Dados importantes
    const rota = urlCompleta.pathname;
    const query = urlCompleta.query;
    // Teste básico de rota + query
    if(rota === "/teste" && req.method === "GET"){
        res.end(JSON.stringify({
            mensagem: 'Funcionou',
            dadosRecebidos: query
        }));
        return;

    };
    res.end("Rota nao encontrada");
});
server.listen(3000, () =>{
    console.log("Servidor rodando em http://localhost:3000");
})