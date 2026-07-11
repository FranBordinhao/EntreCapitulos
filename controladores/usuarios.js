import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"

const SALT_ROUNDS = 12
const JWT_SECRET = process.env.JWT_SECRET || "segredo"

export const criar = async (req, res) => {
    try {
        const { nome, email, senha, bio, cidade, foto_url, privado } = req.body

        if (!nome || !email || !senha)
            return res.status(400).json({ mensagem: "Nome, email e senha são obrigatórios" })

        const emailExistente = await Usuario.findOne({ email })
        if (emailExistente) return res.status(409).json({ mensagem: "Email já cadastrado" })

        const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS)
        const usuario = new Usuario({ nome, email, senha_hash, bio, cidade, foto_url, privado })
        await usuario.save()

        res.status(201).json({ mensagem: "Usuário criado com sucesso", id: usuario._id })
    } catch (erro) {
        if (erro.code === 11000) return res.status(409).json({ mensagem: "Email já cadastrado" })
        if (erro.name === "ValidationError") return res.status(400).json({ mensagem: erro.message })
        res.status(500).json({ mensagem: "Erro ao criar usuário" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha)
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios" })

        const usuario = await Usuario.findOne({ email })
        if (!usuario) return res.status(401).json({ mensagem: "Credenciais inválidas" })

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash)
        if (!senhaCorreta) return res.status(401).json({ mensagem: "Credenciais inválidas" })

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: "1h" })
        res.json({ token })
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao efetuar login" })
    }
}

export const buscar = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select("-senha_hash")
        if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" })

        res.json(usuario)
    } catch (erro) {
        if (erro.name === "CastError") return res.status(400).json({ mensagem: "ID de usuário inválido" })
        res.status(500).json({ mensagem: "Erro ao buscar usuário" })
    }
}

export const atualizar = async (req, res) => {
    try {
        if (req.usuario.id !== req.params.id)
            return res.status(403).json({ mensagem: "Sem permissão para editar este usuário" })

        const campos = ["nome", "bio", "cidade", "foto_url", "privado"]
        const atualizacoes = Object.fromEntries(
            campos.filter(c => req.body[c] !== undefined).map(c => [c, req.body[c]])
        )

        if (req.body.senha) {
            atualizacoes.senha_hash = await bcrypt.hash(req.body.senha, SALT_ROUNDS)
        }

        const usuario = await Usuario.findByIdAndUpdate(req.params.id, atualizacoes, { new: true, runValidators: true }).select("-senha_hash")
        if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" })

        res.json(usuario)
    } catch (erro) {
        if (erro.name === "CastError") return res.status(400).json({ mensagem: "ID de usuário inválido" })
        if (erro.name === "ValidationError") return res.status(400).json({ mensagem: erro.message })
        if (erro.code === 11000) return res.status(409).json({ mensagem: "Email já cadastrado" })
        res.status(500).json({ mensagem: "Erro ao atualizar usuário" })
    }
}

export const deletar = async (req, res) => {
    try {
        if (req.usuario.id !== req.params.id)
            return res.status(403).json({ mensagem: "Sem permissão para excluir este usuário" })

        const usuario = await Usuario.findByIdAndDelete(req.params.id)
        if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" })

        res.json({ mensagem: "Usuário excluído com sucesso" })
    } catch (erro) {
        if (erro.name === "CastError") return res.status(400).json({ mensagem: "ID de usuário inválido" })
        res.status(500).json({ mensagem: "Erro ao excluir usuário" })
    }
}
