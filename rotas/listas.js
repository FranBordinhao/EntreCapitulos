import express from "express";

import {
    criarLista,
    listarListas,
    buscarListaPorId,
    atualizarLista,
    excluirLista
} from "../controladores/listas.js";

const router = express.Router();

router.post("/", criarLista);
router.get("/", listarListas);
router.get("/:id", buscarListaPorId);
router.put("/:id", atualizarLista);
router.delete("/:id", excluirLista);

export default router;