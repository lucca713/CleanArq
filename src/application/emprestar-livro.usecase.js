const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function emprestarLivroUseCase({ emprestimoRepositorio, emailService }) {
    if (!emprestimoRepositorio || !emailService)  {
        throw new AppError(AppError.dependencias)
    }
    return async function ({ usuarioId, livroId, dataSaida, dataRetorno }) {
        const checaCampos = usuarioId && livroId && dataSaida && dataRetorno

        if (!checaCampos) {
            throw new AppError(AppError.parametrosObrigatoriosAusentes)
        }

        if (dataSaida.getTime() > dataRetorno.getTime()) Either.Left(Either.dataRetornoInvalida)

        const existeLivroEmprestadoPendente = await emprestimoRepositorio.existeLivroEmprestadoPendente(livrosId, usuarioId)

        if (existeLivroEmprestadoPendente) return Either.Left(Either.LivroEmprestadoNaodevolvido)

       const id = await emprestimoRepositorio.Emprestar({ usuarioId, livroId, dataSaida, dataRetorno })

       const {usuario, livro} = await emprestimoRepositorio.buscarEmprestimoPorId({id})

       await emailService.enviarEmail({data_saida, data_retorno, nome_usuario:usuario.nome_usuario, cpf:usuario.cpf, email:usuario.email, nome_livro:livro.nome_livro})
        return Either.Right(null)

    }
}