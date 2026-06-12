import express from "express";

import {
    criarEstante,
    listarEstantes,
    buscarEstantePorId,
    atualizarEstante,
    excluirEstante
} from "../controladores/estantes.js";

const router = express.Router();

router.post("/", criarEstante);
router.get("/", listarEstantes);
router.get("/:id", buscarEstantePorId);
router.put("/:id", atualizarEstante);
router.delete("/:id", excluirEstante);

export default router;
