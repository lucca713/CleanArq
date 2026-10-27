const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function buscarLivro({ livrosRepository }) {
    if (!livrosRepository) throw new AppError(AppError.dependencias)

    return async function ({ valor }) {
        const livros = await livrosRepository.buscarPorNomeOuISBN(valor)

        return Either.Right(livros)
    }
}