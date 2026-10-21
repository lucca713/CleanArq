module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
    };


};