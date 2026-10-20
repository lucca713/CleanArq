
const { describe } = require("yargs");
const cadastrarUsuarioUsecase = require("../application/cadastrar-usuario.usecase");

describe('Cadastrar ususario UseCase', function () {
    test('Deve poder cadastrar um usuario  ', async function () {
        const usuarioDTO = {
            nome_completo: 'nome_valido',
            telefone: 'telefone_valido',
            email: 'email_valido',
            endereco: 'endereco_valido',
            CPF: 'CPF_valido',
        }

        const sut = cadastrarUsuarioUsecase();

        const output = await sut(usuarioDTO);

        expect(output).toBeUndefined();
    })
})