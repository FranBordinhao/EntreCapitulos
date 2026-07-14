import Resenha from "../models/resenha.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

//criar resenha
export const criarResenha = async (req, res) => {
    try {

        const resenha = await Resenha.create(req.body);

        res.status(201).json(resenha);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar resenha");
    }
};

//listar resenhas
export const listarResenhas = async (req, res) => {
    try {

        const resenhas = await Resenha.find()
            .populate("usuario_id")
            .populate("livro_id");

        res.status(200).json(resenhas);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao listar resenhas");
    }
};

//buscar resenha por id
export const buscarResenhaPorId = async (req, res) => {
    try {

        const resenha = await Resenha.findById(req.params.id)
            .populate("usuario_id")
            .populate("livro_id");

        if (!resenha) {
            return res.status(404).json({
                mensagem: "Resenha não encontrada"
            });
        }

        res.status(200).json(resenha);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao buscar resenha");
    }
};

//atualizar resenha
export const atualizarResenha = async (req, res) => {
    try {

        const resenhaExistente = await Resenha.findById(req.params.id);

        if (!resenhaExistente) {
            return res.status(404).json({
                mensagem: "Resenha não encontrada"
            });
        }

        if (resenhaExistente.usuario_id.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Sem permissão para editar esta resenha"
            });
        }

        const resenha = await Resenha.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(resenha);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar resenha");
    }
};

//excluir resenha
export const excluirResenha = async (req, res) => {
    try {

        const resenha = await Resenha.findById(req.params.id);

        if (!resenha) {
            return res.status(404).json({
                mensagem: "Resenha não encontrada"
            });
        }

        if (resenha.usuario_id.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Sem permissão para excluir esta resenha"
            });
        }

        await resenha.deleteOne();

        res.status(200).json({
            mensagem: "Resenha removida com sucesso"
        });

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao excluir resenha");
    }
};
