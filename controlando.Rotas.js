const http = require("http");
// Desta forma, estamos manipulando o que o usuário poderá ver
// O conteúdo após a "/" dirá  respeito a cada página da nossa aplicação
// Onde o usuário verá o que nós queremos, a depender da página que ele acessar
// do nosso servidor 
 
const servidor = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Página principal");
    } else if (req.url == "/sobre") {
        res.end("Sobre o sistema");
    } else if (req.url == "/contato") {
        res.end("Contato");
    } else{
        res.end("Página não encontrada!");
    };
});
 
servidor.listen(3000);
 