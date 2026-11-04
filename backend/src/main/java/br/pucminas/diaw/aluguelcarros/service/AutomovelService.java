package br.pucminas.diaw.aluguelcarros.service;

import br.pucminas.diaw.aluguelcarros.dto.automovel.AutomovelRequest;
import br.pucminas.diaw.aluguelcarros.dto.automovel.AutomovelResponse;
import br.pucminas.diaw.aluguelcarros.exception.RecursoNaoEncontradoException;
import br.pucminas.diaw.aluguelcarros.model.Automovel;
import br.pucminas.diaw.aluguelcarros.repository.AutomovelRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Regras de negocio do cadastro de automoveis.
 */
@Service
public class AutomovelService {

    private final AutomovelRepository automovelRepository;

    public AutomovelService(AutomovelRepository automovelRepository) {
        this.automovelRepository = automovelRepository;
    }

    @Transactional(readOnly = true)
    public List<AutomovelResponse> listar() {
        return automovelRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AutomovelResponse buscarPorId(Long id) {
        return toResponse(buscarEntidade(id));
    }

    @Transactional
    public AutomovelResponse criar(AutomovelRequest request) {
        Automovel automovel = new Automovel();
        aplicarDados(automovel, request);
        return toResponse(automovelRepository.save(automovel));
    }

    @Transactional
    public AutomovelResponse atualizar(Long id, AutomovelRequest request) {
        Automovel automovel = buscarEntidade(id);
        aplicarDados(automovel, request);
        return toResponse(automovelRepository.save(automovel));
    }

    @Transactional
    public void remover(Long id) {
        automovelRepository.delete(buscarEntidade(id));
    }

    public Automovel buscarEntidade(Long id) {
        return automovelRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Automovel nao encontrado: " + id));
    }

    private void aplicarDados(Automovel automovel, AutomovelRequest request) {
        automovel.setMatricula(request.matricula());
        automovel.setAno(request.ano());
        automovel.setMarca(request.marca());
        automovel.setModelo(request.modelo());
        automovel.setPlaca(request.placa());
        automovel.setTipoProprietario(request.tipoProprietario());
        automovel.setCategoria(request.categoria());
        automovel.setValorDiaria(request.valorDiaria());
    }

    private AutomovelResponse toResponse(Automovel a) {
        return new AutomovelResponse(
                a.getId(),
                a.getMatricula(),
                a.getAno(),
                a.getMarca(),
                a.getModelo(),
                a.getPlaca(),
                a.getTipoProprietario(),
                a.getCategoria(),
                a.getValorDiaria()
        );
    }
}
