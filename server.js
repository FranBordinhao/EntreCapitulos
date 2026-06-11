import express from "express"
import "./dbconexao.js"

import usuariosRouter from "./rotas/usuarios.js"
import livrosRouter from "./rotas/livros.js"


const app = express()

app.use(express.json())

app.use("/usuarios", usuariosRouter)
app.use("/livros", livrosRouter)

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
