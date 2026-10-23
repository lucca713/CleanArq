

const cadastrarUsuarioUseCase = require("../application/cadastrar-usuario.usecase");
const Either = require("../shared/either/either");
const AppError = require("../shared/errors/app.error");

describe('Cadastrar ususario UseCase', function () {
    //mock
    const usuariosRepository = {
        cadastrar: jest.fn(),
        buscarPorCpf: jest.fn(),
        bucarPorEmail: jest.fn()
    }

    test('Deve poder cadastrar um usuario  ', async function () {
        const usuarioDTO = {
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_valido',
            endereco: 'endereco_valido',
            cpf: 'CPF_valido',
        }

        const sut = cadastrarUsuarioUseCase({ usuariosRepository });

        const output = await sut(usuarioDTO);

        expect(output.right).toBeNull();
        expect(usuariosRepository.cadastrar).toHaveBeenCalledWith(usuarioDTO);
        expect(usuariosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um erro quando o repositorio falhar', function () {
        expect(() => cadastrarUsuarioUseCase({})).toThrow(new AppError(AppError.dependencias));
    });

    test('Deve retornar um erro se algum campo obrigatorio nao for fornecido', async function () {
        const sut = cadastrarUsuarioUseCase({ usuariosRepository });
        const output = await sut({});

        expect(output.right).toBeNull();
        expect(output.left).toEqual(Either.valorNaoFornecido());
    });

    test('deve retornar um erro se o cpf ja estiver cadastrado, para nao cadastrar 2 vezes o mesmo', async function () {
        usuariosRepository.buscarPorCpf.mockReturnValue(true)

        const usuarioDTO = {
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_valido',
            endereco: 'endereco_valido',
            cpf: 'cpf_ja_cadastrado',
        }
        const sut = cadastrarUsuarioUseCase({ usuariosRepository })
        const output = await sut(usuarioDTO)

        expect(output.right).toBeNull()
        expect(output.left).toEqual(Either.valorJaCadastrado('cpf'))
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledWith(usuarioDTO.cpf)
        expect(usuariosRepository.buscarPorCpf).toHaveBeenCalledTimes(3)
    })

    test('Deve retornar um erro de o email for cadastrado 2 vezes', async function () {
        usuariosRepository.buscarPorCpf.mockReturnValue(false)
        usuariosRepository.bucarPorEmail.mockReturnValue(true)

        const usuarioDTO = {
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_ja_cadastrado',
            endereco: 'endereco_valido',
            cpf: 'cpf_valido',
        }

        const sut = cadastrarUsuarioUseCase({ usuariosRepository });
        const output = await sut(usuarioDTO);

        expect(output.right).toBeNull();
        expect(output.left).toEqual(Either.valorJaCadastrado('email'));
        expect(usuariosRepository.bucarPorEmail).toHaveBeenCalledWith(usuarioDTO.email);
        expect(usuariosRepository.bucarPorEmail).toHaveBeenCalledTimes(4);
    })
});