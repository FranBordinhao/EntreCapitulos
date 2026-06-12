import Estante from "../models/estante.js";

export const criarEstante = async (req, res) => {
    try {

        const estante = await Estante.create(req.body);

        res.status(201).json(estante);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//criar listar
export const listarEstantes = async (req, res) => {
    try {

        const estantes = await Estante.find()
            .populate("usuario_id")
            .populate("livro_id");

        res.status(200).json(estantes);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//buscar estante por id
export const buscarEstantePorId = async (req, res) => {
    try {

        const estante = await Estante.findById(req.params.id)
            .populate("usuario_id")
            .populate("livro_id");

        if (!estante) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        res.status(200).json(estante);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//atualizar estante
export const atualizarEstante = async (req, res) => {
    try {

        const estante = await Estante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(estante);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//excluir estante
export const excluirEstante = async (req, res) => {
    try {

        await Estante.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Registro removido com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};
