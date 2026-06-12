import LivroLista from "../models/livroLista.js";

// Adicionar um livro a uma lista
export const criarLivroLista = async (req, res) => {
    try {

        const registro = await LivroLista.create(req.body);

        res.status(201).json(registro);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// Listar todos os livros em uma lista específica
export const listarLivroListas = async (req, res) => {
    try {

        const registros = await LivroLista.find()
            .populate("lista_id")
            .populate("livro_id");

        res.status(200).json(registros);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// Buscar um livro específico em uma lista por ID
export const buscarLivroListaPorId = async (req, res) => {
    try {

        const registro = await LivroLista.findById(req.params.id)
            .populate("lista_id")
            .populate("livro_id");

        if (!registro) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        res.status(200).json(registro);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// atualizar um livro em uma lista
export const atualizarLivroLista = async (req, res) => {
    try {

        const registro = await LivroLista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(registro);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// excluir um livro de uma lista
export const excluirLivroLista = async (req, res) => {
    try {

        await LivroLista.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Registro removido com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};