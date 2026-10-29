const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function emprestarLivroUseCase({ emprestimoRepositorio }) {
    if (!emprestimoRepositorio) {
        throw new AppError(AppError.dependencias)
    }
    return async function ({ usuarioId, livroId, dataSaida, dataRetorno }) {
        const chegaCampos = usuarioId && livroId && dataSaida && dataRetorno

        if (!chegaCampos) {
            throw new AppError(AppError.parametrosObrigatoriosAusentes)
        }

        if (dataSaida.getTime() > dataRetorno.getTime()) Either.Left(Either.dataRetornoInvalida)

        const existeLivroEmprestadoPendente = await emprestimoRepositorio.existeLivroEmprestadoPendente(livrosId, usuarioId)

        if (existeLivroEmprestadoPendente) return Either.LivroEmprestadoNaodevolvido

        await emprestimoRepositorio.Emprestar({ usuarioId, livroId, dataSaida, dataRetorno })

        return Either.Right(null)

    }
}