const app = require('./src/app')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('============================')
    console.log(`Api rodando na porta: ${PORT}`)
    console.log('Para ver o status acesse:')
    console.log(`http://localhost:8080/health`)
    console.log('============================')
})