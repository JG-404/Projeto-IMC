const express = require('express')

const app = express()

app.use(express.json())

app.get('/health', (req, res) => { 
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Hello World! :)'
    })
})

app.post('/imc/', (req, res) => {
    try{    
        const data = req.body
        
        const {peso = 0, altura = 0} = data

        if (peso <= 0) throw new Error("Peso invalido")
        if (altura <= 0) throw new Error("Altura invalida")

        const imc = peso * (altura ** 2)

        res.status(200).json({resultado: imc})
    }
    catch(err){
        res.status(406).json({resultado: "erro"})
    }
})

module.exports = app