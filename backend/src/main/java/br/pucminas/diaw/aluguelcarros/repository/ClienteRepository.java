package br.pucminas.diaw.aluguelcarros.repository;

import br.pucminas.diaw.aluguelcarros.model.Cliente;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsByCpf(String cpf);

    Optional<Cliente> findByUsuarioId(Long usuarioId);
}
