import Atividade from "../models/atividade.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

// Criar uma nova atividade
export const criarAtividade = async (req, res) => {
    try {

        const atividade = await Atividade.create(req.body);

        res.status(201).json(atividade);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar atividade");
    }
};

// listar atividades de um usuário
export const listarAtividades = async (req, res) => {
    try {

        const atividades = await Atividade.find()
            .populate("usuario_id");

        res.status(200).json(atividades);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao listar atividades");
    }
};

// buscar atividades por ID
export const buscarAtividadePorId = async (req, res) => {
    try {

        const atividade = await Atividade.findById(req.params.id)
            .populate("usuario_id");

        if (!atividade) {
            return res.status(404).json({
                mensagem: "Atividade não encontrada"
            });
        }

        res.status(200).json(atividade);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao buscar atividade");
    }
};

// atualizar uma atividade
export const atualizarAtividade = async (req, res) => {
    try {

        const atividade = await Atividade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!atividade) {
            return res.status(404).json({
                mensagem: "Atividade não encontrada"
            });
        }

        res.status(200).json(atividade);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar atividade");
    }
};

// excluir uma atividade
export const excluirAtividade = async (req, res) => {
    try {

        const atividade = await Atividade.findByIdAndDelete(req.params.id);

        if (!atividade) {
            return res.status(404).json({
                mensagem: "Atividade não encontrada"
            });
        }

        res.status(200).json({
            mensagem: "Atividade removida com sucesso"
        });

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao excluir atividade");
    }
};
