const buscarLivro = require("../application/buscar-livro.usecase");
const AppError = require("../shared/errors/app.error");

describe('Buscar livros por nome ou sbn', function () {
    const livrosRepository = {
        buscarPorNomeOuISBN: jest.fn(),
    };
    test('Deve buscar livros por nome', async function () {
        const buscaLivroDTO = {
            valor: 'valor_valido',
        };

        const outputDto = [{
            id: 'id valido',
            nome: 'nome valido',
            quantidade: 'quantidade valida',
            genero: 'genero valido',
            autor: 'autor valido',
            ISBN: 'isbn valido'
        }]
        livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDto)

        sut = buscarLivro({ livrosRepository });
        const output = await sut(buscaLivroDTO);

        expect(output.right).toEqual(outputDto)
        expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(buscaLivroDTO.valor)
        expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1)

    });

    test('Retorna um erro se o livro repository nao for fornecido', function () {
        expect(() => buscarLivro({})).toThrow(new AppError(AppError.dependencias))
    })
})