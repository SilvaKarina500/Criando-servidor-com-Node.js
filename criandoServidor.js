// Criando servidor

// Buscando o protocolo http do Node.js
const http = require('http');

const server = http.createServer((req, res) =>{
    // Buscando o tipo de requisição
    console.log(req.method);
    
    // passando a resposta do servidor com:
    // statusCode = 200;
    // tipo de resposta em um texto simples.
    res.writeHead(200, {'content-type':'text/plain'});
    //resposta do servidor renderizada da tela do navegador.
    res.end('Servidor funcionando!');
});
// Indicação da porta para acesso ao servidor
server.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000");
    console.log('http://localhost:3000');
});