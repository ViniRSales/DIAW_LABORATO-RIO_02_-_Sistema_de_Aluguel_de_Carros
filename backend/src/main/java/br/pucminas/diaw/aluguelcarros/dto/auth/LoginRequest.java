package br.pucminas.diaw.aluguelcarros.dto.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * Credenciais de login (usuario e senha).
 */
public record LoginRequest(
        @NotBlank String username,
        @NotBlank String senha
) {
}
