import mongoose from "mongoose";

const listaSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String
    },

    publica: {
        type: Boolean,
        default: true
    },

    criado_em: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Lista", listaSchema);