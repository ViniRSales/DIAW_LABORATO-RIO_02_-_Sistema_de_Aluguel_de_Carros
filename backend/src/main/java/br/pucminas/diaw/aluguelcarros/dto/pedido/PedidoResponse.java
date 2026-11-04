package br.pucminas.diaw.aluguelcarros.dto.pedido;

import br.pucminas.diaw.aluguelcarros.model.StatusPedido;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Representacao de saida de um pedido de aluguel.
 */
public record PedidoResponse(
        Long id,
        LocalDateTime dataCriacao,
        StatusPedido status,
        BigDecimal valorMensal,
        Long clienteId,
        String clienteNome,
        Long automovelId,
        String automovelDescricao
) {
}
