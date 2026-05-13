// 1 PASSO: Criando do servidor
// 2 passo>: Exibir rota e métado requirido
// 3 passo: Atribuit o método GET
// 4 passo: Atribuir o metodo POST
// 5 paso: Atribuir o método PUT
// 6 passo: Atribuir o método do DELETE
// 7 passo: Ajustes para consumo da API

//Importando o módulo http nativo do NODE.JS
const http = require('http');
// Importando o módulo url nativo do Node.js
const url = require('url');


// Simulando um banco 
let pedidos = [
    {

        id: 1,
        cliente: "Fernanda",
        produto: "Tenis",
        status: "pendente"
    }
]

// Criação do servidor "server"
const server = http.createServer((req, res) => {
    // Definindo a resposta do servidor como um a aplicação JSON 
    res.setHeader('Content-Type', 'application/JSON');

    // Leitura da URL 
    const urlCompleta = url.parse(req.url, true);

    // Recebendo os dados de rota e método através da URL
    const rota = urlCompleta.pathname;
    const metodo = req.method;

    //Liberação do CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "Content-Type");
    
    if(metodo === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }
    


    // Criação do método GET
    //Com a condição ´para que a URL tenha /pedidos e o 
    // método seja o GET para que uma resposta específica
    if (rota === "/pedidos" && metodo === "GET") {
        // Resposta que será exibida para o usuário
        res.end(JSON.stringify({
            mensagem: 'Lista de Pedidos',
            dados: pedidos
        }));
        return;// Finaliza a requisição
    };

    // Criação do método POST
    if (rota === "/pedidos" && metodo === "POST") {
        // Variável body que irá armazenar todas as partes de conteúdo enviados
        //partes requisição
        let body = '';
        // .on =ação
        // Ao disparo da requisição, a ação referente ao armazenamento das partes
        // dentro do body irá acontecer.

        req.on('data', parte => {
            body += parte; // Acumulo das partes na variável body
        });

        // .on = ação
        // No disparo da função, após o armazenamento das partes no body,
        // damos inicio a ação final para processamento da requisição
        req.on('end', () => {
            // novoPedido irá armazenar o conteúdo de body traduzido para uma 
            // oobjeto JavaScript
            const novoPedido = JSON.parse(body);

            // Incluindo o novoPedido no nosso array de pedidos
            pedidos.push(novoPedido);

            res.statusCode = 201; // Criado com sucesso


            // Resposta final para o usuário, a confirmação de cadastro do 
            // novo pedido acompanhado dos dados novoPedido
            res.end(JSON.stringify({
                mensagem: "Pedido cadastrado com sucesso",
                pedido: novoPedido
            }));
        });
        return; // Encerra a requisição
    };

    // Criação do método PUT
    if (rota === "/pedidos" && metodo === "PUT") {
        let body = ''; // variável que armazena os pedaço da requisição
        // ação que será disparada com a requisição para armazenar as partes
        //da requisição dentro da variável body

        req.on('data', parte => {
            body += parte;
        });

        req.on('end', () => {
            // a variável dados receberá a tradução do body em ojeto JavaScript
            const dados = JSON.parse(body);
            let encontrado = false; // facilitará o servidor a enbcontrar o id
            //correspondente

            // pedidos está recebendo o mapeamento do array pedidos
            //pedido (no singular) = cada objeto do array
            pedidos = pedidos.map(pedido => {
                // Comparação de ID para ser possível substituir
                if (pedido.id === dados.id) {
                    encontrado = true;// Quando localizado, vira true.
                    //retornará todos os dados de pedidos que não foram
                    // alterados + status de cada um deles 

                    return {
                        ...pedido,
                        status: dados.status
                    };
                };
                return pedido;
            });
            // Caso o pedido não seja encontrada (exemplo: buscar o id 5, que não existe),
            //será retornado o statuscode 404 e uma mensagem de pedido não encontrado
            if (!encontrado) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado" }));
                return
            };
            // Resposta final para o usuário, com a pedido localizado e atualizado via
            //requisição PUT
            res.end(JSON.stringify({
                mensagem: "Pedido atualizado com sucesso",
                dados: pedidos
            }));

        });
        return;
    };
    //Criação do método DELETE
    if(rota === "/pedidos" && metodo === "DELETE") {
        let body = '';

        req.on('data', parte => {
            body += parte;
        });

        req.on('end', () =>{
            // dados receberá o body traduzido para objeto em JavaScript
            const dados = JSON.parse(body);
           
            //Medirá o tamanho do array antes de o deletar-mos
            const tamanhoAntes = pedidos.length;
           
            //Manterá todos os pedidos que NÃO tem o id informado e removerá os que
            //tem o ID igual ao enviado pela requisição.
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
             

           // Fará a comparação de tamanho do array, se os tamanhos 
           // estiverem identidos, o pedido não foi localizado para que seja apagado.
            if(pedidos.length === tamanhoAntes){
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado" }));
                return;
            };
            //Resposta final que exibe o pedido removido com sucesso e exibe o array
            //atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };

    





    res.statusCode = 400; // Not Found = Não encontrada
    // Resposta para o usuário caso ele busque uma rota inexistente
    res.end(JSON.stringify({
        mensagem: 'Página não encontrada'
    }));
});
// Definição da porta onde o servidor rodará

server.listen(3000, () => {
    console.log('Server running in http://localhost:3000');
});