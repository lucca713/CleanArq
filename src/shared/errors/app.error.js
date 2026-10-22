module.exports = class AppError extends Error {
    constructor(message) {
        super(message)
        this.message = message
    }

    static dependencias = 'Alguma dependendcias obrigatorio nao foi fornecida';
    static validarEmail = 'email invalido';
    static validarTelefone = 'telefone invalido';
    static validarCPF = 'CPF invalido';
    static validarEndereco = 'endereco invalido';
    static validarNomeCompleto = 'nome_completo invalido';

}