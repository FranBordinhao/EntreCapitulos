import Estante from "../models/estante.js";
import { tratarErroMongoose } from "../utils/tratarErroMongoose.js";

export const criarEstante = async (req, res) => {
    try {

        const estante = await Estante.create(req.body);

        res.status(201).json(estante);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao criar estante");
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
        tratarErroMongoose(erro, res, "Erro ao listar estantes");
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
        tratarErroMongoose(erro, res, "Erro ao buscar estante");
    }
};

//atualizar estante
export const atualizarEstante = async (req, res) => {
    try {

        const estante = await Estante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!estante) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        res.status(200).json(estante);

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao atualizar estante");
    }
};

//excluir estante
export const excluirEstante = async (req, res) => {
    try {

        const estante = await Estante.findByIdAndDelete(req.params.id);

        if (!estante) {
            return res.status(404).json({
                mensagem: "Registro não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Registro removido com sucesso"
        });

    } catch (erro) {
        tratarErroMongoose(erro, res, "Erro ao excluir estante");
    }
};
