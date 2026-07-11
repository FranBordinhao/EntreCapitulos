import express from "express";

import {
    criarLista,
    listarListas,
    buscarListaPorId,
    atualizarLista,
    excluirLista
} from "../controladores/listas.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarLista);
router.get("/", listarListas);
router.get("/:id", buscarListaPorId);
router.put("/:id", verificarToken, atualizarLista);
router.delete("/:id", verificarToken, excluirLista);

export default router;