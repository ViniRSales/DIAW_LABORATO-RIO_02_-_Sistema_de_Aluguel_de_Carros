package br.pucminas.diaw.aluguelcarros.repository;

import br.pucminas.diaw.aluguelcarros.model.Automovel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AutomovelRepository extends JpaRepository<Automovel, Long> {
}
