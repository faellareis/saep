const eletronicosDAO = require('../model/DAO/eletronicos.js')

const listarProdutos = async () => {
    try {
        const produtos = await eletronicosDAO.listarProdutos()
        return { status: 200, produtos }
    } catch (error) {
        return { status: 500, message: "Erro interno ao listar produtos" }
    }
}

const criarProduto = async (dados) => {
    if (!dados.nome || !dados.preco) return { status: 400, message: "Nome e preço são obrigatórios" }
    try {
        const produto = await eletronicosDAO.criarProduto(dados)
        return { status: 201, produto }
    } catch (error) {
        return { status: 500, message: "Erro interno ao criar produto" }
    }
}

module.exports = { listarProdutos, criarProduto }

