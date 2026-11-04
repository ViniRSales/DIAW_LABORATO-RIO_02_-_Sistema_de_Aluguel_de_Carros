package br.pucminas.diaw.aluguelcarros.dto.automovel;

import br.pucminas.diaw.aluguelcarros.model.TipoProprietario;

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
        TipoProprietario tipoProprietario
) {
}
