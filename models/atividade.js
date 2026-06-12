import mongoose from "mongoose";

const atividadeSchema = new mongoose.Schema({

    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    tipo: {
        type: String,
        enum: [
            "inicio_leitura",
            "fim_leitura",
            "resenha",
            "lista",
            "seguir",
            "favorito"
        ],
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    criado_em: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Atividade", atividadeSchema);