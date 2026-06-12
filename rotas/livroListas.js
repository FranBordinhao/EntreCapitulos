import express from "express";

import {
    criarLivroLista,
    listarLivroListas,
    buscarLivroListaPorId,
    atualizarLivroLista,
    excluirLivroLista
} from "../controladores/livroListas.js";

const router = express.Router();

router.post("/", criarLivroLista);
router.get("/", listarLivroListas);
router.get("/:id", buscarLivroListaPorId);
router.put("/:id", atualizarLivroLista);
router.delete("/:id", excluirLivroLista);

export default router;