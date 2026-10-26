const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function cadastrarLivroUseCase({ livrosRepository }) {
    if (!livrosRepository) throw new AppError(AppError.dependencias)

    return async function ({ nome, quantidade, autor, genero, ISBN }) {
        await livrosRepository.cadastrar({ nome, quantidade, autor, genero, ISBN })
        return Either.Right(null)
    }
}