import mongoose from "mongoose";

const resenhaSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    livro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livro",
        required: true
    },

    nota: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    texto: {
        type: String,
        required: true
    },

    spoiler: {
        type: Boolean,
        default: false
    },

    criado_em: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Resenha", resenhaSchema);