const Either = require("../shared/either/either")
const AppError = require("../shared/errors/app.error")

module.exports = function buscarUsuarioPorCpf({ usuariosRepository }) {
    if (!usuariosRepository) throw new AppError(AppError.dependencias)
    return async function ({ cpf }) {

        if (!cpf) return Either.Left(Either.valorNaoFornecido('cpf'))

        const usuario = await usuariosRepository.buscarPorCpf(cpf)
        if (!usuario) {
            return Either.Left(Either.usuarioNaoEncontrado(cpf))
        }

        return Either.Right(usuario)
    }
}