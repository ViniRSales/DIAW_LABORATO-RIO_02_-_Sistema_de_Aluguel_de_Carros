package br.pucminas.diaw.aluguelcarros.dto.cliente;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * Dados de entrada para criar/atualizar um cliente.
 * A lista de empregadoras admite no maximo 3 itens (validado no servico).
 */
public record ClienteRequest(
        @NotBlank String rg,
        @NotBlank String cpf,
        @NotBlank String nome,
        @NotBlank String endereco,
        String profissao,
        @Valid @Size(max = 3, message = "O cliente pode ter no maximo 3 entidades empregadoras")
        List<EmpregadoraDTO> empregadoras
) {
}
