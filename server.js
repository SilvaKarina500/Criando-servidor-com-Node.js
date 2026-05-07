// Estamos importandoa função createServer do módulo http do Node
const { createServer } = require('node:http');

const hostname = "127.0.0.1"; // endereço do servidor
 
const port = 3000; // porta onde o servidor vai rodar

// Criando o servidor
const server = createServer((req, res) =>{
 res.statusCode = 200; //ok

 // Define o tipo de conteúdo da resposta
 // Aqui estamos dizendo que é um texto simples
 res.setHeader('Content-Type', 'text/plain')

 res.end("Hello, NODE!")
});

//Faz o servidor "escutar" na porta e no endereço que definimos.
// Quando o servidor iniciar, executa essa função.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});