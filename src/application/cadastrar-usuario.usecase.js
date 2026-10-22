const AppError = require("../shared/errors/app.error");

module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        if (!usuariosRepository) throw new AppError(AppError.dependencias)
        const camposObrigatorio = ['nome_completo', 'telefone', 'email', 'endereco', 'cpf']

        if (camposObrigatorio.some(campo => !campo)) throw new AppError(AppError.parametrosObrigatoriosAusentes)

        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
    };


};