import 'reflect-metadata' // importante vir antes
import express from 'express';
import "./database";

const app = express();

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