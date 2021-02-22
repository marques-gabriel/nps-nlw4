import express from 'express';

// Tipagem express(tipagem em biblioteca externa): yarn add @types/express -D
// Conversão/Node: yarn add typescript -D
// Inicializar TS na aplicação: yarn tsc --init
// TS-node-dev para converter código em tempo de execução p/ JS: yarn add ts-node-dev -D

const app = express();

/**
 * HTTP:
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

 //http://localhost:3333/users
app.get("/", (request, response) => {
    return response.json({message: "Hello, World" })
});

// 1 param => Rota(Recurso API)
// 2 param => (request, response)
app.post("/", (request, response) => {
    // Recebeu dados para salvar
    return response.json({message: "Dados salvos com sucesso"})
})

// Yarn dev configurado no package.json pelo Ts-node-dev
app.listen(3333, () => console.log("Server is running!"));