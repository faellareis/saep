const estoqueDAO = require('../model/DAO/estoque.js')

const listarEstoque = async () => {
    try {
        const estoque = await estoqueDAO.listarEstoque()
        return { status: 200, estoque }
    } catch (error) {
        return { status: 500, message: "Erro interno ao listar estoque" }
    }
}

const atualizarEstoque = async (produto_id, quantidade_atual) => {
    if (!produto_id || quantidade_atual == null)
        return { status: 400, message: "Produto e quantidade obrigatórios" }
    try {
        const estoque = await estoqueDAO.atualizarEstoque(produto_id, quantidade_atual)
        return { status: 200, estoque }
    } catch (error) {
        return { status: 500, message: "Erro interno ao atualizar estoque" }
    }
}

module.exports = { listarEstoque, atualizarEstoque }
