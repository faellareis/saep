
const categoriasModel = require('../model/DAO/categorias.js')

// Listar todas as categorias
const listarCategorias = async () => {
    try {
        const categorias = await categoriasModel.listarCategorias()

        if (categorias && categorias.length > 0) {
            return {
                status: 200,
                message: 'Categorias encontradas com sucesso',
                categorias: categorias
            }
        } else {
            return {
                status: 404,
                message: 'Nenhuma categoria encontrada'
            }
        }
    } catch (error) {
        console.error('Erro ao listar categorias:', error)
        return {
            status: 500,
            message: 'Erro ao buscar categorias no banco'
        }
    }
}

// Criar uma nova categoria
const criarCategoria = async (nome, descricao) => {
    try {
        if (!nome) {
            return { status: 400, message: 'O campo nome é obrigatório' }
        }

        const categoriaCriada = await categoriasModel.criarCategoria(nome, descricao)

        if (categoriaCriada) {
            return {
                status: 201,
                message: 'Categoria criada com sucesso',
                categoria: categoriaCriada
            }
        } else {
            return {
                status: 500,
                message: 'Erro ao criar categoria'
            }
        }
    } catch (error) {
        console.error('Erro ao criar categoria:', error)
        return {
            status: 500,
            message: 'Erro interno ao criar categoria'
        }
    }
}

module.exports = {
    listarCategorias,
    criarCategoria
}