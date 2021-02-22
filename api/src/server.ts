import express from 'express';

const app = express();

/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica
 */

 //http://localhost:3333/users
app.get("/", (request, response) => {
    return response.json({message: "Hello, World"})

});

// 1 param => Rota(Recurso API)
// 2 param => (request, response)

app.post("/", (request, response) => {
    // Recebeu dados para salvar
    return response.json({message: "Dados salvos com sucesso"})
})

app.listen(3333, () => console.log("Server is running!"));