package br.pucminas.diaw.aluguelcarros.dto.automovel;

import br.pucminas.diaw.aluguelcarros.model.TipoProprietario;
import java.math.BigDecimal;

/**
 * Representacao de saida de um automovel.
 */
public record AutomovelResponse(
        Long id,
        String matricula,
        Integer ano,
        String marca,
        String modelo,
        String placa,
        TipoProprietario tipoProprietario,
        String categoria,
        BigDecimal valorDiaria
) {
}
