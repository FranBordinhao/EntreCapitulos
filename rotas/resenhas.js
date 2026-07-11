import express from "express";

import {
    criarResenha,
    listarResenhas,
    buscarResenhaPorId,
    atualizarResenha,
    excluirResenha
} from "../controladores/resenhas.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarResenha);
router.get("/", listarResenhas);
router.get("/:id", buscarResenhaPorId);
router.put("/:id", verificarToken, atualizarResenha);
router.delete("/:id", verificarToken, excluirResenha);

export default router;