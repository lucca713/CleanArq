const cadastrarLivroUsecase = require("../application/cadastrar-livro.usecase");

describe('Cadastrar Livro Usecase', function () {
    test('Deve cadastrar um livro', async function () {
        const livroDto = {
            nome: 'Nome valido',
            quantidade: 'quantidade valida',
            genero: 'genero valido',
            ISBN: 'isbn livro valido'
        };

        const livrosRepository = {
            cadastrar: jest.fn()
        };

        const sut = cadastrarLivroUsecase({ livrosRepository });

        const output = await sut(livroDto);

        expect(output.right).toBeNull();
        expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDto);
        expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
    })
})