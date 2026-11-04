package br.pucminas.diaw.aluguelcarros.dto.automovel;

import br.pucminas.diaw.aluguelcarros.model.TipoProprietario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Dados de entrada para criar/atualizar um automovel.
 */
public record AutomovelRequest(
        @NotBlank String matricula,
        @NotNull Integer ano,
        @NotBlank String marca,
        @NotBlank String modelo,
        @NotBlank String placa,
        TipoProprietario tipoProprietario,
        String categoria,
        BigDecimal valorDiaria
) {
}
