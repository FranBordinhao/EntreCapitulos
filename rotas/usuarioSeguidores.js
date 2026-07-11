import express from "express";

import {
    criarUsuarioSeguidor,
    listarUsuarioSeguidores,
    buscarUsuarioSeguidorPorId,
    atualizarUsuarioSeguidor,
    excluirUsuarioSeguidor
} from "../controladores/usuarioSeguidores.js";
import verificarToken from "../middleware/verificarToken.js";

const router = express.Router();

router.post("/", verificarToken, criarUsuarioSeguidor);
router.get("/", listarUsuarioSeguidores);
router.get("/:id", buscarUsuarioSeguidorPorId);
router.put("/:id", verificarToken, atualizarUsuarioSeguidor);
router.delete("/:id", verificarToken, excluirUsuarioSeguidor);

export default router;