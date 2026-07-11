import express from "express";

import {
    criarEstante,
    listarEstantes,
    buscarEstantePorId,
    atualizarEstante,
    excluirEstante
} from "../controladores/estantes.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarEstante);
router.get("/", listarEstantes);
router.get("/:id", buscarEstantePorId);
router.put("/:id", verificarToken, atualizarEstante);
router.delete("/:id", verificarToken, excluirEstante);

export default router;
