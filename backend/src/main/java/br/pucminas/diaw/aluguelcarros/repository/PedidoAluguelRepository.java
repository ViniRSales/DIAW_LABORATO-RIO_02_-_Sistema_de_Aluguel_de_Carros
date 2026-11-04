package br.pucminas.diaw.aluguelcarros.repository;

import br.pucminas.diaw.aluguelcarros.model.PedidoAluguel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel, Long> {

    List<PedidoAluguel> findByClienteId(Long clienteId);
}
