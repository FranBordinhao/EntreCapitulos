import express from "express";

import {
    criarLivroLista,
    listarLivroListas,
    buscarLivroListaPorId,
    atualizarLivroLista,
    excluirLivroLista
} from "../controladores/livroListas.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarLivroLista);
router.get("/", listarLivroListas);
router.get("/:id", buscarLivroListaPorId);
router.put("/:id", verificarToken, atualizarLivroLista);
router.delete("/:id", verificarToken, excluirLivroLista);

export default router;