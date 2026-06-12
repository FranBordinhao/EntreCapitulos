import Resenha from "../models/resenha.js";

//criar resenha
export const criarResenha = async (req, res) => {
    try {

        const resenha = await Resenha.create(req.body);

        res.status(201).json(resenha);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

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

        res.status(500).json({
            erro: erro.message
        });

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

        res.status(500).json({
            erro: erro.message
        });

    }
};

//atualizar resenha
export const atualizarResenha = async (req, res) => {
    try {

        const resenha = await Resenha.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(resenha);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//excluir resenha
export const excluirResenha = async (req, res) => {
    try {

        await Resenha.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Resenha removida com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};