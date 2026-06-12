import mongoose from "mongoose";

const estanteSchema = new mongoose.Schema({
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

    status: {
        type: String,
        enum: ["quero_ler", "lendo", "lido", "abandonado"],
        default: "quero_ler"
    },

    progresso: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    data_inicio: {
        type: Date
    },

    data_conclusao: {
        type: Date
    }
});

export default mongoose.model("Estante", estanteSchema);