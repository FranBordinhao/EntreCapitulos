import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"]
    },
    senha_hash: { type: String, required: true },
    bio: { type: String, default: "" },
    cidade: { type: String, default: "" },
    foto_url: { type: String, default: "" },
    privado: { type: Boolean, default: false },
    criado_em: { type: Date, default: Date.now }
})

export default mongoose.model("Usuario", usuarioSchema)
