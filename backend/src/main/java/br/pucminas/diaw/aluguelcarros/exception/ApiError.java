package br.pucminas.diaw.aluguelcarros.exception;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Corpo padronizado de resposta de erro da API.
 */
public record ApiError(
        LocalDateTime timestamp,
        int status,
        String erro,
        String mensagem,
        Map<String, String> campos
) {
}
