const AppError = require("../shared/errors/app.error");

module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        if (!usuariosRepository) throw new AppError(AppError.dependencias)
        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
    };


};