const AppError = require("../shared/errors/app.error")

describe('AppError', function () {

    test('AppError é uma instancia de Error', function () {
        const appError = new AppError('erro')
        expect(appError).toBeinstanceOf(Error)
    })

    test('Garantir que o AppError tenha uma mensagem correta', function () {
        const mensagemErro = 'Mensagem de erro'
        const appError = new AppError(mensagemErro)
        //verifica o tipo, se a mensagem é string ele vai ver se eh mesmo pelo to be
        expect(appError.message).toBe(mensagemErro)
    })
})
