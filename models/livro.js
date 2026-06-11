import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    autores: [{
        type: String
    }],

    isbn: {
        type: String
    },

    editora: {
        type: String
    },

    ano: {
        type: Number
    },

    paginas: {
        type: Number
    },

    capa_url: {
        type: String
    },

    sinopse: {
        type: String
    },

    criado_em: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Livro", livroSchema);