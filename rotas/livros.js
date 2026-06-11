import express from "express";

import {
    criarLivro,
    listarLivros,
    buscarLivroPorId,
    atualizarLivro,
    excluirLivro
} from "../controladores/livros.js";

const router = express.Router();

router.post("/", criarLivro);

router.get("/", listarLivros);

router.get("/:id", buscarLivroPorId);

router.put("/:id", atualizarLivro);

router.delete("/:id", excluirLivro);

export default router;

