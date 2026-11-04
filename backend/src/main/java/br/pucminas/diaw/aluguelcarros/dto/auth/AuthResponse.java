package br.pucminas.diaw.aluguelcarros.dto.auth;

import br.pucminas.diaw.aluguelcarros.model.PerfilUsuario;

/**
 * Resposta de autenticacao contendo o token JWT e dados basicos do usuario.
 */
public record AuthResponse(
        String token,
        String username,
        PerfilUsuario perfil
) {
}
