import express from "express"
import "./dbconexao.js"


import usuariosRouter from "./rotas/usuarios.js"
import livrosRouter from "./rotas/livros.js"
import estantesRouter from "./rotas/estantes.js";
import resenhasRouter from "./rotas/resenhas.js";
import listasRouter from "./rotas/listas.js";
import livroListasRouter from "./rotas/livroListas.js";
import usuarioSeguidoresRouter from "./rotas/usuarioSeguidores.js";



const app = express()

app.use(express.json())


app.use("/usuarios", usuariosRouter)
app.use("/livros", livrosRouter)
app.use("/estantes", estantesRouter);
app.use("/resenhas", resenhasRouter);
app.use("/listas", listasRouter);
app.use("/livro-listas", livroListasRouter);
app.use("/usuarios-seguidores", usuarioSeguidoresRouter);


app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
