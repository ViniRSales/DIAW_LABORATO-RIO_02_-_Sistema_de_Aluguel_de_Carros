package br.pucminas.diaw.aluguelcarros.dto.cliente;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/**
 * Entidade empregadora e rendimento auferido pelo cliente.
 */
public record EmpregadoraDTO(
        @NotBlank String nome,
        @NotNull @PositiveOrZero BigDecimal rendimento
) {
}
