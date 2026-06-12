import express from "express";

import {
    criarResenha,
    listarResenhas,
    buscarResenhaPorId,
    atualizarResenha,
    excluirResenha
} from "../controladores/resenhas.js";

const router = express.Router();

router.post("/", criarResenha);
router.get("/", listarResenhas);
router.get("/:id", buscarResenhaPorId);
router.put("/:id", atualizarResenha);
router.delete("/:id", excluirResenha);

export default router;