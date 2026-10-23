const buscarUsuarioPorCpfUsecase = require("../application/buscar-usuario-por-cpf.usecase")

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
})