module.exports = function cadastrarUsusarioUseCase({ usuariosRepository }) {

    return async function ({ nome_completo, telefone, email, endereco, cpf }) {
        if (!usuariosRepository) throw new Error('Erro no repository de usuario')

        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco,
            cpf
        });
    };


};