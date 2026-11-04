const emprestarLivroUsecase = require("../application/emprestar-livro.usecase")


describe('Emprestar livro use case', function () {
    emprestimoRepositorio = {
        Emprestar: jest.fn(),
        existeLivroEmprestadoPendente: jest.fn()
    }
    test('Deve poder emprestar um livro', async function () {

        const emprestarLivroDto = {
            livro_id: 'qualquer_livro_id',
            usuario_id: 'qualquer_usuario',
            data_saida: new Date('2026-02-16'),
            data_entra: new Date('2026-02-16')
        }

        const sut = emprestarLivroUsecase({ emprestimoRepositorio })
        const output = await sut(emprestarLivroDto)

        expect(output.right).toBeNull()
        expect(emprestimoRepositorio.Emprestar).toHaveBeenCalledWith(emprestarLivroDto)
        expect(emprestimoRepositorio.Emprestar).toHaveBeenCalledTimes(1)

    })
})