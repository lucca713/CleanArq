module.exports = function cadastrarUsusarioUseCase() {

    return async function ({ nome_completo, telefone, email, endereco }) {
        await usuariosRepository.cadastrar({
            nome_completo,
            telefone,
            email,
            endereco
        });
    };


};