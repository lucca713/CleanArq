const Either = require("../shared/either/either");
const AppError = require("../shared/errors/app.error");

module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {
    if (!usuariosRepository) throw new AppError(AppError.dependencias)

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        const camposObrigatorios = nome_completo && telefone && email && endereco && cpf

        const checaCpf = await usuariosRepository.buscarPorCpf(cpf)

        const checaEmail = await usuariosRepository.bucarPorEmail(email)

        if (checaCpf) {
            return Either.Left(Either.valorJaCadastrado('cpf'))
        }

        if(checaEmail){
            return Either.Left(Either.valorJaCadastrado('email'))
        }

        if (!camposObrigatorios) {
            return Either.Left(Either.valorNaoFornecido())
        }

        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
        return Either.Right(null)
    };


};