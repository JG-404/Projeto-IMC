const express    = require("express")
const session    = require("express-session")
const bodyParser = require("body-parser")
const path       = require("path")
const { error } = require("console")

const app     = express()
const PORT    = process.env.PORT || 8081
const API_URL = process.env.API_URL || `http://localhost:${PORT}`

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('form')
})

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`)
})