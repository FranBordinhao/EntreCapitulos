import express from "express";

import {
    criarLivro,
    listarLivros,
    buscarLivroPorId,
    atualizarLivro,
    excluirLivro
} from "../controladores/livros.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarLivro);

router.get("/", listarLivros);

router.get("/:id", buscarLivroPorId);

router.put("/:id", verificarToken, atualizarLivro);

router.delete("/:id", verificarToken, excluirLivro);

export default router;

