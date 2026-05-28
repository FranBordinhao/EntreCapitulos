import express from "express"
import "./dbconexao.js"
import usuariosRouter from "./rotas/usuarios.js"

const app = express()
app.use(express.json())

app.use("/usuarios", usuariosRouter)

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
