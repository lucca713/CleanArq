const AppError = require("../shared/errors/app.error");

module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {
    if (!usuariosRepository) throw new AppError(AppError.dependencias)

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        const camposObrigatorios = nome_completo && telefone && email && endereco && cpf


        if (!camposObrigatorios) {
            throw new AppError(AppError.parametrosObrigatoriosAusentes);
        }

        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
    };


};