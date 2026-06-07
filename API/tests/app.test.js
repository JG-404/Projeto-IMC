const request = require('supertest')
const app = require('../src/app')

describe('API health', () => {
    test('Deve retornar 200 e ok', async () => {
        const res = await request(app).get('/health')
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('ok')
    })
})

describe('Teste do calculo do IMC', () => {
    test('Deve retornar 406', async () => {
        const res = (await request(app).post('/imc').send({
            peso: 0,
            altura: 0
        }))
        expect(res.statusCode).toBe(406)
    })
    test('Deve retornar 200', async () => {
        const res = (await request(app).post('/imc').send({
            peso: 70,
            altura: 1.82
        }))
        expect(res.statusCode).toBe(200)
        expect(res.body.resultado).toBeCloseTo(21.13)
    })
    test('Deve retornar 406', async () => {
        const res = (await request(app).post('/imc').send({
            peso: 0,
            altura: 1.82
        }))
        expect(res.statusCode).toBe(406)
    })
})