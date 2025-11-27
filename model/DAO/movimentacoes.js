const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// Selecionar todas as movimentações
const selecionarTodasMovimentacoes = async function () {
    try {
        const sql = `
            SELECT 
                m.id AS id_movimentacao,
                p.nome AS produto,
                m.tipo_movimentacao,
                m.quantidade,
                m.motivo,
                DATE_FORMAT(m.created_at, '%d/%m/%Y %H:%i:%s') AS data
            FROM tbl_movimentacoes_estoque AS m
            JOIN tbl_eletronicos AS p ON m.produto_id = p.id
            ORDER BY m.created_at DESC;
        `

        const resultado = await prisma.$queryRawUnsafe(sql)
        return resultado

    } catch (erro) {
        console.error('Erro ao buscar movimentações:', erro)
        return false
    }
}

// Inserir movimentação
const inserirMovimentacao = async function (dados) {
    try {
        let sql = `
            INSERT INTO tbl_movimentacoes_estoque (
                produto_id, tipo_movimentacao, quantidade, motivo
            ) VALUES (
                ${dados.produto_id},
                '${dados.tipo_movimentacao}',
                ${dados.quantidade},
                '${dados.motivo || ''}'
            )
        `

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (erro) {
        console.error('Erro ao registrar movimentação:', erro)
        return false
    }
}

module.exports = {
    inserirMovimentacao,
    selecionarTodasMovimentacoes
}