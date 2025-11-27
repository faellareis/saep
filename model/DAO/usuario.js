const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* LOGIN DE USUÁRIO */
const loginUsuario = async function (username, password) {
    try {
        let sql = `SELECT id, username 
                   FROM tbl_usuario 
                   WHERE username = '${username}' 
                     AND password = '${password}'`

        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : null

    } catch (error) {
        console.error("Erro no login do usuário:", error)
        return null
    }
}

module.exports = {
    loginUsuario
}
