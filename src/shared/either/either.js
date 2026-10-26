module.exports = class Either {
    constructor(left, right) {
        this.left = left; //erro
        this.right = right; //deu crerto
    }

    static Left(left) { return new Either(left, null) }

    static Right(right) { return new Either(null, right) }

    static valorJaCadastrado(valor) {
        return { message: `${valor} ja cadastrado` }
    }

    static valorNaoFornecido() {
        return { message: `Valor nao fornecido` }
    }

    static usuarioNaoEncontrado(valor) {
        return { message: `${valor} nao foi encontrado` }
    }
    static isbnJaCadastrado(valor) {
        return { message: `${valor} ja cadastrado` }
    }
}