const emprestarLivroUsecase = require("../application/emprestar-livro.usecase")
const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")


describe('Emprestar livro use case', function () {
    emprestimoRepositorio = {
        Emprestar: jest.fn(),
        existeLivroEmprestadoPendente: jest.fn(),
        buscarEmprestimoPorId: jest.fn()
    }

    emailService = {
        enviarEmail: jest.fn()
    }
    test('Deve poder emprestar um livro', async function () {
        emprestimoRepositorio.Emprestar.mockResolvedValue('qualquer id')
        emprestimoRepositorio.buscarEmprestimoPorId.mockResolvedValue({ usuario: { nome: 'qualquer nome', cpf: 'qualquer cpf', email: 'qualquer email' }, livro: { nome: 'qualquer nome' } })
        const emprestarLivroDto = {
            livro_id: 'qualquer_livro_id',
            usuario_id: 'qualquer_usuario',
            data_saida: new Date('2026-02-16'),
            data_entra: new Date('2026-02-15')
        }

        const sut = emprestarLivroUsecase({ emprestimoRepositorio, emailService })
        const output = await sut(emprestarLivroDto)

        expect(output.right).toBeNull()
        expect(emprestimoRepositorio.Emprestar).toHaveBeenCalledWith(emprestarLivroDto)
        expect(emprestimoRepositorio.Emprestar).toHaveBeenCalledTimes(1)
        expect(emailService.enviarEmail).toHaveBeenCalledWith({ data_saida: emprestarLivroDto.data_saida, data_entrada: emprestarLivroDto.data_entra, nome_usuario: 'qualquer nome', cpf: 'qualquer cpf valido', email: 'qualquer email valido', nome_livro: 'nome livro' })

    })

    test('Deve retornar um erro se a data de retorno for menor a de saída', async function () {
        const emprestarLivroDto = {
            livro_id: 'qualquer_livro_id',
            usuario_id: 'qualquer_usuario',
            data_saida: new Date('2026-02-16'),
            data_entra: new Date('2026-02-15')
        }
        const sut = emprestarLivroUsecase({ emprestimoRepositorio, emailService })
        const output = await sut(emprestarLivroDto)

        expect(output.left).ToBe(Either.dataRetornoInvalida)
    })

    test('nao deve permitir o emprestimo de um livro com o mesmo isbn para o mesmo usuario, sem ele ter devolvido', async function () {
        emprestimoRepositorio.existeLivroEmprestadoPendente.mockResolvedValue(true)
        const emprestarLivroDto = {
            livro_id: 'qualquer_livro_id',
            usuario_id: 'qualquer_usuario',
            data_saida: new Date('2026-02-16'),
            data_entra: new Date('2026-02-15')
        }
        const sut = emprestarLivroUsecase({ emprestimoRepositorio, emailService })
        const output = await sut(emprestarLivroDto)

        expect(output.left).ToBe(Either.LivroEmprestadoNaodevolvido)
        expect(emprestimoRepositorio.existeLivroEmprestadoPendente).toHaveBeenCalledWith({ livro_id: emprestarLivroDto.livro_id, usuario_id: emprestarLivroDto.usuario_id })
        expect(emprestimoRepositorio.existeLivroEmprestadoPendente).toHaveBeenCalledTimes(2)
    })

    test('Deve retornar um erro se o emprestimo repositorio nao for fornecido', function () {
        expect(() => emprestarLivroUsecase({})).toThrow(new AppError(AppError.dependencias))
    })

    test('Deve retornar um erro se algum campo obrigatorio nao for fornecido', async function () {
        const sut = emprestarLivroUsecase({ emprestimoRepositorio, emailService })

        await expect(() => sut({})).rejacts.toThrow(new AppError(AppError.parametrosObrigatoriosAusentes))
    })
})