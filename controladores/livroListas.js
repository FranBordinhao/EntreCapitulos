import LivroLista from "../models/livroLista.js";
import Lista from "../models/lista.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

// Adicionar um livro a uma lista
export const criarLivroLista = async (req, res) => {
    try {

        const registro = await LivroLista.create(req.body);

        res.status(201).json(registro);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar registro");
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
        tratarErroMongoose(erro, res, "Erro ao listar registros");
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
        tratarErroMongoose(erro, res, "Erro ao buscar registro");
    }
};

// atualizar um livro em uma lista
export const atualizarLivroLista = async (req, res) => {
    try {

        const registroExistente = await LivroLista.findById(req.params.id);

        if (!registroExistente) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        const lista = await Lista.findById(registroExistente.lista_id);

        if (!lista || lista.usuario_id.toString() !== req.usuario.id) {
            return res.status(403).json({
                mensagem: "Sem permissão para editar este registro"
            });
        }

        const registro = await LivroLista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(registro);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar registro");
    }
};

// excluir um livro de uma lista
export const excluirLivroLista = async (req, res) => {
    try {

        const registro = await LivroLista.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        const lista = await Lista.findById(registro.lista_id);

        if (!lista || lista.usuario_id.toString() !== req.usuario.id) {
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
