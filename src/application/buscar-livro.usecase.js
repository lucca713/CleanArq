const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function buscarLivro({ livrosRepository }) {
    if (!livrosRepository) throw new AppError(AppError.dependencias)

    return async function ({ valor }) {

        if (!valor) {
            return Either.Left(Either.valorNaoFornecido)
        }

        const livros = await livrosRepository.buscarPorNomeOuISBN(valor)


        if (!livros) {
            return Either.Left(Either.livroNaoEncontrado(valor))
        }

        return Either.Right(livros)
    }
}