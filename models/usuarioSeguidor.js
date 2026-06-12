import mongoose from "mongoose";

const usuarioSeguidorSchema = new mongoose.Schema({

    seguidor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    seguido_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    criado_em: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("UsuarioSeguidor", usuarioSeguidorSchema);