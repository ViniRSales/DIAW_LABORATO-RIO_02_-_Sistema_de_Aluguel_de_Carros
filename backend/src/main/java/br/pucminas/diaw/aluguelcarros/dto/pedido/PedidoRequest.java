package br.pucminas.diaw.aluguelcarros.dto.pedido;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/**
 * Dados de entrada para criar/atualizar um pedido de aluguel.
 */
public record PedidoRequest(
        @NotNull Long automovelId,
        @PositiveOrZero BigDecimal valorMensal
) {
}
