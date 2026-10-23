const buscarUsuarioPorCpfUsecase = require("../application/buscar-usuario-por-cpf.usecase")
const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

describe('Buscando usuario por cpf, usecase', function () {
    const usuariosRepository = {
        buscarPorCpf: jest.fn(),

    }
    test('deve retornar uma usuario caso ele estaja cadastrado', async function () {

        const cpfDoUsuario = {
            cpf: 'cpf_cadastrado'
        }

        const outputDTO = {
            id: 'qualquer_id',
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_valido',
            endereco: 'endereco_valido',
            cpf: 'cpf_ja_cadastrado',
        }

        usuariosRepository.buscarPorCpf.mockResolvedValue(outputDTO)

        const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository })
        const output = await sut(cpfDoUsuario)

        expect(output.right).toEqual(outputDTO)
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDoUsuario.cpf)
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar null quando um cpf nao foi informado', async function () {
        const cpfDto = {
            cpf: 'cpf_nao_informado'
        }

        usuariosRepository.buscarPorCpf.mockResolvedValue(null)

        const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository })
        const output = await sut(cpfDto)

        expect(output.left).toEqual(Either.usuarioNaoEncontrado(cpfDto.cpf))
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledWith(cpfDto.cpf)
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(2)
    })

    test('Deve retornar erro caso o cpf não for fornecido', async function () {
        const sut = buscarUsuarioPorCpfUsecase({ usuariosRepository })
        const output = await sut({})
        expect(output.right).toBeNull()
        expect(output.left).toEqual(Either.valorNaoFornecido())
    });


})