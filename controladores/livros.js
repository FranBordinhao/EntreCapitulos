

import Livro from "../models/livro.js";

export const criarLivro = async (req, res) => {
    try {
        const livro = await Livro.create(req.body);

        res.status(201).json(livro);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

//buscar todos os livros
export const listarLivros = async (req, res) => {
    try {

        const livros = await Livro.find();

        res.status(200).json(livros);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

//buscar livro por ID
export const buscarLivroPorId = async (req, res) => {
    try {

        const livro = await Livro.findById(req.params.id);

        if (!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        res.status(200).json(livro);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

//atualizar livro

export const atualizarLivro = async (req, res) => {
    try {

        const livro = await Livro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(livro);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

//excluir livro

export const excluirLivro = async (req, res) => {
    try {

        await Livro.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Livro removido com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

