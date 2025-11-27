const usuarioDAO = require('../model/DAO/usuario.js')

const usuarioLogin = async function (username, password) {
    // Validação dos campos obrigatórios
    if (!username || !password) {
        return {
            status: 400,
            message: "Username e senha são obrigatórios."
        }
    }

    try {
        const usuario = await usuarioDAO.loginUsuario(username, password)

        if (usuario) {
            return {
                status: 200,
                message: "Login realizado com sucesso.",
                usuario: {
                    id: usuario.id,
                    username: usuario.username
                }
            }
        } else {
            return {
                status: 401,
                message: "Username ou senha incorretos."
            }
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error)
        return {
            status: 500,
            message: "Erro interno do servidor."
        }
    }
}

module.exports = {
    usuarioLogin
}