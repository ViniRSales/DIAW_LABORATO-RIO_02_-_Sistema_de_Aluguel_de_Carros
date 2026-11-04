package br.pucminas.diaw.aluguelcarros.dto.auth;

import br.pucminas.diaw.aluguelcarros.model.PerfilUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Dados para cadastro de um novo usuario.
 */
public record RegistroRequest(
        @NotBlank @Size(min = 3, max = 60) String username,
        @NotBlank @Size(min = 6, max = 100) String senha,
        @Email String email,
        @NotNull PerfilUsuario perfil
) {
}
