import Lista from "../models/lista.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

//criar lista
export const criarLista = async (req, res) => {
    try {
        const lista = await Lista.create(req.body);
        res.status(201).json(lista);
    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar lista");
    }
};

//listar todas as listas
export const listarListas = async (req, res) => {
    try {
        const listas = await Lista.find()
            .populate("usuario_id");

        res.status(200).json(listas);
    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao listar listas");
    }
};

//buscar lista por id
export const buscarListaPorId = async (req, res) => {
    try {

        const lista = await Lista.findById(req.params.id)
            .populate("usuario_id");

        if (!lista) {
            return res.status(404).json({
                mensagem: "Lista não encontrada"
            });
        }

        res.status(200).json(lista);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao buscar lista");
    }
};

//atualizar lista
export const atualizarLista = async (req, res) => {
    try {

        const lista = await Lista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!lista) {
            return res.status(404).json({
                mensagem: "Lista não encontrada"
            });
        }

        res.status(200).json(lista);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar lista");
    }
};

//excluir lista
export const excluirLista = async (req, res) => {
    try {

        const lista = await Lista.findByIdAndDelete(req.params.id);

        if (!lista) {
            return res.status(404).json({
                mensagem: "Lista não encontrada"
            });
        }

        res.status(200).json({
            mensagem: "Lista removida com sucesso"
        });

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao excluir lista");
    }
};
