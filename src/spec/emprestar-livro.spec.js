describe('Emprestar livro use case', function (){
    test('Deve poder emprestar um livro', async function(){

        const emprestarLivroDto = {
            livro_id:'qualquer_livro_id',
            usuario_id:'qualquer_usuario',
            data_saida:'data_saida_valida',
            data_entra:'data_etrada_valida'
        }

        const sut = emprestarLivroUseCase({emprestimoRepositorio})
        const output = await sut(emprestarLivroDto)

    })
})