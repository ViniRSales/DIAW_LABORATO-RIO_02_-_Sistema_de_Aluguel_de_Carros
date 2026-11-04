package br.pucminas.diaw.aluguelcarros.dto.cliente;

import java.util.List;

/**
 * Representacao de saida de um cliente.
 */
public record ClienteResponse(
        Long id,
        String rg,
        String cpf,
        String nome,
        String endereco,
        String profissao,
        List<EmpregadoraDTO> empregadoras
) {
}
