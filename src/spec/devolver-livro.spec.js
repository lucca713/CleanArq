describe('devolver livro', function () {

    test('Deve ser possivel devolver um livro sem multa', async function(){

        const devolverLivroDto = {
            emprestimo_id:'qualquer_id',
            data_devolucao: new Date('2026-02-13')
        };

        const sut = devolverLivroUseCase({emprestimoRepositorio});
        const output = await sut(devolverLivroDto);

        expect(output.right).toBeNull('Multa de 0 Reais');
        expect(emprestimoRepositorio.devolver).toHaveBeenCalledWith(devolverLivroDto);
        expect(emprestimoRepositorio.devolver).toHaveBeenCalledTimes(1);
    });
}

);