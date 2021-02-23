# TypeScript
- Tipagem express(tipagem em biblioteca externa): yarn add @types/express -D
- Conversão/Node: yarn add typescript -D
- Inicializar TS na aplicação: yarn tsc --init
- TS-node-dev para converter código em tempo de execução p/ JS: yarn add ts-node-dev -D

# Métodos HTTP:
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica

# Formas de conectar com BD (inserir BD na aplicação):
 * Driver do próprio BD (nativo)
 * Query Builder (knexjs)
 * ORM (typeorm (trabalha bem com TS, genérico), sequelize etc) - Mapeamento entre objetos. Mapear classe para uma tabela específica no BD

- beekeeper

# Migration:
 * Alterações do BD na aplicação
 * Histórico de alteração do BD
 * Estrutura BD
 * Criar: yarn typeorm migration:create -n CreateUsers
 * Rodar: yarn typeorm migration:run
 * Desfazer a ultima: yarn typeorm migration:revert

# Repository
- Entity manager
- Realizar ações e manipulações de dados dentro do BD
- Comunicação com BD
- Específico para cada entidade

# Server

```
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

```