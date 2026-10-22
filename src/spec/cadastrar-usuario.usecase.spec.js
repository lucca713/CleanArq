

const cadastrarUsuarioUsecase = require("../application/cadastrar-usuario.usecase");
const AppError = require("../shared/errors/app.error");

describe('Cadastrar ususario UseCase', function () {
    //mock
    const usuariosRepository = {
        cadastrar: jest.fn()
    }

    test('Deve poder cadastrar um usuario  ', async function () {
        const usuarioDTO = {
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_valido',
            endereco: 'endereco_valido',
            cpf: 'CPF_valido',
        }

        const sut = cadastrarUsuarioUsecase({ usuariosRepository });

        const output = await sut(usuarioDTO);

        expect(output).toBeUndefined();
        expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
        expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um erro quando o repositorio falhar', function () {

        expect(() => cadastrarUsuarioUsecase({})).toThrow(new AppError(AppError.dependencias));
    });
});