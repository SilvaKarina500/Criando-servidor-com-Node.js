const http = require('http');

// Simula um "banco de dados" em memória
// array de objetos
let livros = [
    {
        id: 1,
        titulo: "O pequeno Principe",
        autor: "Antonie de Saint-Exupéry"
    }
];

//Criando o servidor 
const server = http.createServer((req, res) => {
    // armazenando o método requirido
    const method = req.method;
    // armazenando o URL da requisição
    const url = req.url;
    //
    res.setHeader('Content-Type', 'application/json');

    //MÉTODO GET
    if (url === "/livros" && method === "GET") {
        // Status 200 =  sucesso
        res.statusCode = 200;
        // Retorna a lista de livros em formato JSON
        res.end(JSON.stringify(livros));
        return; // encerra a requisição
    }

    // MÉTODO POST

    if (url === "/livros" && method === "POST") {
        let body = '';
        // Oque significa o .on é uma ação que vai ser disparada junto com requisição
        // "data -> começo", "end -> faz a volta",
        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
            const novoLivro = JSON.parse(body);

            livros.push(novoLivro);

            res.statusCode = 201;
            res.end(JSON.stringify({
                mensagem: 'Livro cadastrado com sucesso',
                livro: novoLivro
            }));
        });
        return;
    }

    //Método PUT
    if (url === "/livros" && method === "PUT") {
        let body = '';

        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
            const livrosAtualizado = JSON.parse(body);
            livros = livros.map(livro => {
                if (livro.id === livrosAtualizado.id) {
                    return livrosAtualizado;
                };
                return livro;
            });
            res.statusCode = 200; // sucesso

            res.end(JSON.stringify({
                menagem: 'livro atualizado',
                livros: livros
            }));
        });
        return
    };
    // metodo DELETE cuidado com letras maiusculas, virgulas 
    if (url === "/livros" && method === "DELETE") {
        let body = '';

        req.on('data', parte => {
            body += parte;
        });
        // função que chama a requisição filter
        // o dados esta recebendo oque eu vou deleta vou usar o id para comparar

        req.on('end', () => {
            const dados = JSON.parse(body);
            livros = livros.filter(livro => livro.id !== dados.id);

            res.statusCode = 200;

            res.end(JSON.stringify({
                mensagem: 'livro removido com sucesso',
                livros: livros

            }));
        });
        return; // fim da requisição
    };
    res.statusCode = 404;

    res.end(JSON.stringify({
        mensagem: 'Rota não encontrada'
    }));


});
server.listen(3000, () => {
    console.log("Servidor disponível em: http://localhost:3000/livros");
});