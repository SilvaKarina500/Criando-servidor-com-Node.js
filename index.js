// Importa o módulo HTTP do node.Js
// Este módulo já vem nativo no node e permite criar
// Servidores web

const http = require("http");

//Criando o servidor
// CreateServer recebe a função que será executada toda vez que alguem acessar o servidor

// req (request) => informações da requisição
// res (response) => resposta que vamos enviar ao cliente
const servidor = http.createServer((req, res) => {

    // enviando a resposta para o navegador
    res.end("Meu primeiroi servidor Node!");

});

// Faz o servidor buscar na porta 3000 (escolhida por nós)
servidor.listen(3000);

// Porta comuns:
// 3000 => desenvolvimento
// 5000 => comun para API'S
// 8080 => alternativas para web
// 80 => HTTP padrão
// 443 => HTTPS