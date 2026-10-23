const Either = require("../shared/either/either")

module.exports = function buscarUsuarioPorCpf({ usuariosRepository }) {

    return async function ({ cpf }) {
        const usuario = await usuariosRepository.buscarPorCpf(cpf)
        if (!usuario) {
            return Either.Left(Either.usuarioNaoEncontrado(cpf))
        }

        return Either.Right(usuario)
    }
}