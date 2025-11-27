const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const usuarioController = require('./controller/usuarioController.js')
const categoriasController = require('./controller/categoriasController.js')


const app = express()

// Middleware para ler JSON
app.use(bodyParser.json())

// Configuração de CORS
app.use(cors()) // já cobre todas as requisições

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

/* USUÁRIO */
app.post('/v1/login', async function (req, res) {
    try {
        const { username, password } = req.body
        const resultado = await usuarioController.usuarioLogin(username, password)
        res.status(resultado.status).json(resultado)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro interno no login" })
    }
})

/* CATEGORIAS */
app.get('/v1/categorias', async (req, res) => {
    const resultado = await categoriasController.listarCategorias()
    res.status(resultado.status).json(resultado)
})

app.post('/v1/categorias', async (req, res) => {
    const { nome, descricao } = req.body
    const resultado = await categoriasController.criarCategoria(nome, descricao)
    res.status(resultado.status).json(resultado)
})


/* PRODUTOS */
app.get('/v1/produtos', async (req, res) => {
    const resultado = await require('./controller/eletronicosController').listarProdutos()
    res.status(resultado.status).json(resultado)
})

app.post('/v1/produtos', async (req, res) => {
    const dados = req.body
    const resultado = await require('./controller/eletronicosController').criarProduto(dados)
    res.status(resultado.status).json(resultado)
})

/* ESTOQUE */
app.get('/v1/estoque', async (req, res) => {
    const resultado = await require('./controller/estoqueController').listarEstoque()
    res.status(resultado.status).json(resultado)
})

app.put('/v1/estoque', async (req, res) => {
    const { produto_id, quantidade_atual } = req.body
    const resultado = await require('./controller/estoqueController').atualizarEstoque(produto_id, quantidade_atual)
    res.status(resultado.status).json(resultado)
})

/* MOVIMENTAÇÕES DE ESTOQUE */
app.get('/v1/movimentacoes', async (req, res) => {
    const resultado = await require('./controller/movimentacoesController').listarMovimentacoes()
    res.status(resultado.status).json(resultado)
})

app.post('/v1/movimentacoes', async (req, res) => {
    const dados = req.body
    const resultado = await require('./controller/movimentacoesController').criarMovimentacao(dados)
    res.status(resultado.status).json(resultado)
})


app.listen(8080, function(){
    console.log('API aguardando requisições...')
})
