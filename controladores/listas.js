import Lista from "../models/lista.js";

//criar lista
export const criarLista = async (req, res) => {
    try {
        const lista = await Lista.create(req.body);
        res.status(201).json(lista);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

//listar todas as listas
export const listarListas = async (req, res) => {
    try {
        const listas = await Lista.find()
            .populate("usuario_id");

        res.status(200).json(listas);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
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
        res.status(500).json({ erro: erro.message });
    }
};

//atualizar lista
export const atualizarLista = async (req, res) => {
    try {

        const lista = await Lista.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(lista);

    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

//excluir lista
export const excluirLista = async (req, res) => {
    try {

        await Lista.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Lista removida com sucesso"
        });

    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

