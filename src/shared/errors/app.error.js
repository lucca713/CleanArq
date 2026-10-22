module.exports = class AppError extends Error {
    constructor(message) {
        super(message)
        this.message = message
    }

    static dependencias = 'Alguma dependendcias obrigatorio nao foi fornecida';
    static parametrosObrigatoriosAusentes = 'Algum parametro obrigatorio nao foi fornecido'

}