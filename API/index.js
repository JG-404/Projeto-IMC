const app = require('./src/app')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('================================')
    console.log(`API rodando na porta: ${PORT}`)
    console.log(`Para consultar os status acesse:`)
    console.log(`http:localhost:${PORT}/health`)
    console.log('================================')
})