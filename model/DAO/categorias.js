const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const listarCategorias = async () => {
    try {
        return await prisma.tbl_categorias.findMany()
    } catch (error) {
        console.error("Erro ao listar categorias:", error)
        throw error
    }
}

const criarCategoria = async (nome, descricao) => {
    try {
        return await prisma.tbl_categorias.create({
            data: { nome, descricao }
        })
    } catch (error) {
        console.error("Erro ao criar categoria:", error)
        throw error
    }
}

module.exports = { listarCategorias, criarCategoria }
