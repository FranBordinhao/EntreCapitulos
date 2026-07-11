export function tratarErroMongoose(erro, res, mensagemPadrao) {
    if (erro.name === "CastError")
        return res.status(400).json({ mensagem: "ID inválido" })

    if (erro.name === "ValidationError")
        return res.status(400).json({ mensagem: erro.message })

    if (erro.code === 11000)
        return res.status(409).json({ mensagem: "Registro duplicado" })

    res.status(500).json({ mensagem: mensagemPadrao })
}
