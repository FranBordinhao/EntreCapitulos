import UsuarioSeguidor from "../models/usuarioSeguidor.js";

// Criar um novo seguidor
export const criarUsuarioSeguidor = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.create(req.body);

        res.status(201).json(registro);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

// Listar seguidores de um usuário
export const listarUsuarioSeguidores = async (req, res) => {
    try {

        const registros = await UsuarioSeguidor.find()
            .populate("seguidor_id")
            .populate("seguido_id");

        res.status(200).json(registros);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

//buscar um seguidor específico por ID
export const buscarUsuarioSeguidorPorId = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.findById(req.params.id)
            .populate("seguidor_id")
            .populate("seguido_id");

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

//atualizar um seguidor
export const atualizarUsuarioSeguidor = async (req, res) => {
    try {

        const registro = await UsuarioSeguidor.findByIdAndUpdate(
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

//excluir um seguidor
export const excluirUsuarioSeguidor = async (req, res) => {
    try {

        await UsuarioSeguidor.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensagem: "Registro removido com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
};

