const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const usuarioController = require('./controller/usuarioController.js')

const bodyParserJSON = bodyParser.json()

const app = express()

// Configuração de CORS

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})




/* USUÁRIO */
app.post('/v1/login', cors(), async function (request, response) {
    try {
        const { username, password } = request.body
        const resultado = await usuarioController.usuarioLogin(username, password)
        response.status(resultado.status).json(resultado)
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: "Erro interno no login" })
    }
})


app.listen(8080, function(){
    console.log('API aguardando requisições...')
})