package br.pucminas.diaw.aluguelcarros.service;

import br.pucminas.diaw.aluguelcarros.dto.auth.AuthResponse;
import br.pucminas.diaw.aluguelcarros.dto.auth.LoginRequest;
import br.pucminas.diaw.aluguelcarros.dto.auth.RegistroRequest;
import br.pucminas.diaw.aluguelcarros.exception.RegraNegocioException;
import br.pucminas.diaw.aluguelcarros.model.Usuario;
import br.pucminas.diaw.aluguelcarros.repository.UsuarioRepository;
import br.pucminas.diaw.aluguelcarros.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Regras de cadastro e autenticacao de usuarios.
 */
@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByUsername(request.username())) {
            throw new RegraNegocioException("Nome de usuario ja esta em uso");
        }

        Usuario usuario = new Usuario(
                request.username(),
                passwordEncoder.encode(request.senha()),
                request.email(),
                request.perfil()
        );
        usuarioRepository.save(usuario);

        String token = jwtService.gerarToken(usuario.getUsername());
        return new AuthResponse(token, usuario.getUsername(), usuario.getPerfil());
    }

    public AuthResponse autenticar(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.senha()));

        Usuario usuario = usuarioRepository.findByUsername(request.username())
                .orElseThrow(() -> new RegraNegocioException("Usuario ou senha invalidos"));

        String token = jwtService.gerarToken(usuario.getUsername());
        return new AuthResponse(token, usuario.getUsername(), usuario.getPerfil());
    }
}
