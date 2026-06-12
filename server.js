import express from "express"
import "./dbconexao.js"


import usuariosRouter from "./rotas/usuarios.js"
import livrosRouter from "./rotas/livros.js"
import estantesRouter from "./rotas/estantes.js";
import resenhasRouter from "./rotas/resenhas.js";


const app = express()

app.use(express.json())


app.use("/usuarios", usuariosRouter)
app.use("/livros", livrosRouter)
app.use("/estantes", estantesRouter);
app.use("/resenhas", resenhasRouter);


app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
