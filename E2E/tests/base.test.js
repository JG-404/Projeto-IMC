const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')
const { finalization } = require('process')

const BASE_URL = process.env.APP_URL || 'http://localhost:8081'
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots')

// garante que o diretorio existe e se nao cria-o
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, {recursive: true})

async function tiraFoto(name){
    try{
        const img = await driver.takeScreenshot()
        const file = path.join(SCREENSHOTS_DIR, `${name}.png`)
        fs.writeFileSync(file, img, 'base64')

        console.log(`Foto tirada ${name}.png`)
    }
    catch(err){
        console.warn('Erro ao tirar foto')
    }
}

async function usaPagina(altura, peso, testeN) {
    const opts = new chrome.Options()
        opts.addArguments(
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1920, 1080',
            '--disable-gpu'
        )

    driver = await new Builder()
        .forBrowser()
        .setChromeOptions(opts)
        .build()
    
    try{
        await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 15000 })

        await driver.get(BASE_URL)

        tiraFoto('pagina' + testeN)

        await driver.findElement(By.id('altura')).sendKeys(altura)
        await driver.findElement(By.id('peso')).sendKeys(peso)

        tiraFoto('infosColocadas' + testeN)

        await driver.findElement(By.id('enviar')).click()

        await new Promise(r => setTimeout(r, 800))

        tiraFoto("infosEnviadas" + testeN)
    }
    finally{
        await driver.quit()
    }
}

async function main() {
    try{
        await usaPagina(1.82, 70, 1)
        await usaPagina(0, 70, 2)
        await usaPagina(1.82, 0, 3)
    }
    finally{
        console.log("Testes Realizados")
    }
}

main().catch(err => {
    console.log('FATAL ERROR XD', err)
    process.exit(1)
})