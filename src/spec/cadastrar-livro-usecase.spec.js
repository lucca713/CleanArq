const cadastrarLivroUsecase = require("../application/cadastrar-livro.usecase");
const Either = require("../shared/either/either");
const AppError = require("../shared/errors/app.error");

describe('Cadastrar Livro Usecase', function () {
    const livrosRepository = {
        cadastrar: jest.fn(),
        existePorISBN: jest.fn()
    };

    test('Deve cadastrar um livro', async function () {
        const livroDto = {
            nome: 'Nome valido',
            quantidade: 'quantidade valida',
            genero: 'genero valido',
            autor: 'autor do livro',
            ISBN: 'isbn livro valido'
        };


        const sut = cadastrarLivroUsecase({ livrosRepository });

        const output = await sut(livroDto);

        expect(output.right).toBeNull();
        expect(livrosRepository.cadastrar).toHaveBeenCalledWith(livroDto);
        expect(livrosRepository.cadastrar).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um erro se o repositorio de livro nao for fornecido', function () {
        expect(() => cadastrarLivroUsecase({})).toThrow(new AppError(AppError.dependencias));
    })

    test('Deve retornar um erro se os campos obrigatorio nao forem fornecidos', async function () {
        const sut = cadastrarLivroUsecase({ livrosRepository })
        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.parametrosObrigatoriosAusentes))
    })

    test('Deve retornar um erro se o ISBN for duplicado', async function () {
        livrosRepository.existePorISBN.mockResolvedValue(true)

        const livroDto = {
            nome: 'Nome valido',
            quantidade: 'quantidade valida',
            genero: 'genero valido',
            autor: 'autor do livro',
            ISBN: 'ISBN ja cadastrado'
        }

        const sut = cadastrarLivroUsecase({ livrosRepository })
        const output = await sut(livroDto)

        expect(output.left).toEqual(Either.isbnJaCadastrado('ISBN'))
        expect(livrosRepository.existePorISBN).toHaveBeenCalledWith(livroDto.ISBN)
        expect(livrosRepository.existePorISBN).toHaveBeenCalledTimes(2)
    })
})