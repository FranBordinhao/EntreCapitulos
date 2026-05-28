import { Router } from "express"
import { criar, login, buscar, atualizar, deletar } from "../controladores/usuarios.js"
import verificarToken from "../middleware/verificarToken.js"

const router = Router()

router.post("/", criar)
router.post("/login", login)
router.get("/:id", buscar)
router.put("/:id", verificarToken, atualizar)
router.delete("/:id", verificarToken, deletar)

export default router
