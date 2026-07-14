import UsuarioSeguidor from "../models/usuarioSeguidor.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

// Criar um novo seguidor
export const criarUsuarioSeguidor = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.create(req.body);

        res.status(201).json(registro);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar registro");
    }
};

// Listar seguidores de um usuário
export const listarUsuarioSeguidores = async (req, res) => {
    try {

        const registros = await UsuarioSeguidor.find()
            .populate("seguidor_id")
            .populate("seguido_id");

        res.status(200).json(registros);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao listar registros");
    }
};

//buscar um seguidor específico por ID
export const buscarUsuarioSeguidorPorId = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.findById(req.params.id)
            .populate("seguidor_id")
            .populate("seguido_id");

        if (!registro) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        res.status(200).json(registro);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao buscar registro");
    }
};

//atualizar um seguidor
export const atualizarUsuarioSeguidor = async (req, res) => {
    try {

        const registroExistente = await UsuarioSeguidor.findById(req.params.id);

        if (!registroExistente) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        if (registroExistente.seguidor_id.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Sem permissão para editar este registro"
            });
        }

        const registro = await UsuarioSeguidor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(registro);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar registro");
    }
};

//excluir um seguidor
export const excluirUsuarioSeguidor = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        if (registro.seguidor_id.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Sem permissão para excluir este registro"
            });
        }

        await registro.deleteOne();

        res.status(200).json({
            mensagem: "Registro removido com sucesso"
        });

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao excluir registro");
    }
};
