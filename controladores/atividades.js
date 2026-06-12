import Atividade from "../models/atividade.js";

// Criar uma nova atividade
export const criarAtividade = async (req, res) => {
    try {

        const atividade = await Atividade.create(req.body);

        res.status(201).json(atividade);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// listar atividades de um usuário
export const listarAtividades = async (req, res) => {
    try {

        const atividades = await Atividade.find()
            .populate("usuario_id");

        res.status(200).json(atividades);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

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

        res.status(500).json({
            erro: erro.message
        });

    }
};

// atualizar uma atividade
export const atualizarAtividade = async (req, res) => {
    try {

        const atividade = await Atividade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(atividade);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// excluir uma atividade
export const excluirAtividade = async (req, res) => {
    try {

        await Atividade.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Atividade removida com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};