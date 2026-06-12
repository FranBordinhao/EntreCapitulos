import express from "express";

import {
    criarUsuarioSeguidor,
    listarUsuarioSeguidores,
    buscarUsuarioSeguidorPorId,
    atualizarUsuarioSeguidor,
    excluirUsuarioSeguidor
} from "../controladores/usuarioSeguidores.js";

const router = express.Router();

router.post("/", criarUsuarioSeguidor);
router.get("/", listarUsuarioSeguidores);
router.get("/:id", buscarUsuarioSeguidorPorId);
router.put("/:id", atualizarUsuarioSeguidor);
router.delete("/:id", excluirUsuarioSeguidor);

export default router;