/****************************************************************************************
 * OBJETIVO: Controller responsável por tratar as requisições de movimentações de estoque
 * DATA: 27/11/2025
 * AUTOR: Rafaella Reis
 * VERSÃO: 2.5
 ****************************************************************************************/

const movimentacaoDAO = require('../model/DAO/movimentacoes.js')
// Listar todas as movimentações
const listarMovimentacoes = async function () {
    try {
        const movimentacoes = await movimentacaoDAO.selecionarTodasMovimentacoes()

        if (movimentacoes && movimentacoes.length > 0) {
            return {
                status: 200,
                message: 'Movimentações encontradas com sucesso',
                movimentacoes: movimentacoes
            }
        } else {
            return {
                status: 404,
                message: 'Nenhuma movimentação encontrada'
            }
        }

    } catch (error) {
        console.error('Erro ao listar movimentações:', error)
        return {
            status: 500,
            message: 'Erro ao buscar movimentações no banco'
        }
    }
}

// Criar uma nova movimentação
const criarMovimentacao = async function (dados) {
    try {
        if (!dados.produto_id || !dados.quantidade || !dados.tipo_movimentacao) {
            return { status: 400, message: 'Preencha todos os campos obrigatórios' }
        }

        const resultado = await movimentacaoDAO.inserirMovimentacao(dados)

        if (resultado) {
            return {
                status: 201,
                message: 'Movimentação registrada com sucesso',
                movimentacao: resultado
            }
        } else {
            return {
                status: 500,
                message: 'Erro ao registrar movimentação'
            }
        }

    } catch (error) {
        console.error('Erro ao criar movimentação:', error)
        return {
            status: 500,
            message: 'Erro interno ao registrar movimentação'
        }
    }
}

module.exports = {
    listarMovimentacoes,
    criarMovimentacao
}
