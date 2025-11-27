const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const listarProdutos = async () => {
    try {
        return await prisma.tbl_eletronicos.findMany()
    } catch (error) {
        console.error("Erro ao listar produtos:", error)
        throw error
    }
}

const criarProduto = async (dados) => {
    try {
        return await prisma.tbl_eletronicos.create({ data: dados })
    } catch (error) {
        console.error("Erro ao criar produto:", error)
        throw error
    }
}

module.exports = { listarProdutos, criarProduto }
