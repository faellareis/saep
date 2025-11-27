const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const listarEstoque = async () => {
    try {
        return await prisma.tbl_estoque.findMany()
    } catch (error) {
        console.error("Erro ao listar estoque:", error)
        throw error
    }
}

const atualizarEstoque = async (id, quantidade_atual) => {
    try {
        return await prisma.tbl_estoque.update({
            where: { id },   // id é unique
            data: { quantidade_atual }
        })
    } catch (error) {
        console.error("Erro ao atualizar estoque:", error)
        throw error
    }
}




module.exports = { listarEstoque, atualizarEstoque }
