import express from "express";

import {
    criarAtividade,
    listarAtividades,
    buscarAtividadePorId,
    atualizarAtividade,
    excluirAtividade
} from "../controladores/atividades.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarAtividade);
router.get("/", listarAtividades);
router.get("/:id", buscarAtividadePorId);
router.put("/:id", verificarToken, atualizarAtividade);
router.delete("/:id", verificarToken, excluirAtividade);

export default router;
