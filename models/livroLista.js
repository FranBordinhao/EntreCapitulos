import mongoose from "mongoose";

const livroListaSchema = new mongoose.Schema({

    lista_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lista",
        required: true
    },

    livro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livro",
        required: true
    },

    adicionado_em: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("LivroLista", livroListaSchema);