import express from "express";

import {
    criarAtividade,
    listarAtividades,
    buscarAtividadePorId,
    atualizarAtividade,
    excluirAtividade
} from "../controladores/atividades.js";

const router = express.Router();

router.post("/", criarAtividade);
router.get("/", listarAtividades);
router.get("/:id", buscarAtividadePorId);
router.put("/:id", atualizarAtividade);
router.delete("/:id", excluirAtividade);

export default router;
