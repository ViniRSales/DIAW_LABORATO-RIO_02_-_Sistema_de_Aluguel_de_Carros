package br.pucminas.diaw.aluguelcarros.service;

import br.pucminas.diaw.aluguelcarros.dto.cliente.ClienteRequest;
import br.pucminas.diaw.aluguelcarros.dto.cliente.ClienteResponse;
import br.pucminas.diaw.aluguelcarros.dto.cliente.EmpregadoraDTO;
import br.pucminas.diaw.aluguelcarros.exception.RecursoNaoEncontradoException;
import br.pucminas.diaw.aluguelcarros.exception.RegraNegocioException;
import br.pucminas.diaw.aluguelcarros.model.Cliente;
import br.pucminas.diaw.aluguelcarros.model.EntidadeEmpregadora;
import br.pucminas.diaw.aluguelcarros.repository.ClienteRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Regras de negocio do CRUD de cliente, incluindo a restricao de no
 * maximo 3 entidades empregadoras por cliente.
 */
@Service
public class ClienteService {

    private static final int MAX_EMPREGADORAS = 3;

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listar() {
        return clienteRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorId(Long id) {
        return toResponse(buscarEntidade(id));
    }

    @Transactional
    public ClienteResponse criar(ClienteRequest request) {
        validarEmpregadoras(request);
        if (clienteRepository.existsByCpf(request.cpf())) {
            throw new RegraNegocioException("Ja existe um cliente com este CPF");
        }

        Cliente cliente = new Cliente();
        aplicarDados(cliente, request);
        return toResponse(clienteRepository.save(cliente));
    }

    @Transactional
    public ClienteResponse atualizar(Long id, ClienteRequest request) {
        validarEmpregadoras(request);
        Cliente cliente = buscarEntidade(id);

        if (!cliente.getCpf().equals(request.cpf()) && clienteRepository.existsByCpf(request.cpf())) {
            throw new RegraNegocioException("Ja existe um cliente com este CPF");
        }

        cliente.limparEmpregadoras();
        aplicarDados(cliente, request);
        return toResponse(clienteRepository.save(cliente));
    }

    @Transactional
    public void remover(Long id) {
        Cliente cliente = buscarEntidade(id);
        clienteRepository.delete(cliente);
    }

    private Cliente buscarEntidade(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente nao encontrado: " + id));
    }

    private void validarEmpregadoras(ClienteRequest request) {
        if (request.empregadoras() != null && request.empregadoras().size() > MAX_EMPREGADORAS) {
            throw new RegraNegocioException("O cliente pode ter no maximo 3 entidades empregadoras");
        }
    }

    private void aplicarDados(Cliente cliente, ClienteRequest request) {
        cliente.setRg(request.rg());
        cliente.setCpf(request.cpf());
        cliente.setNome(request.nome());
        cliente.setEndereco(request.endereco());
        cliente.setProfissao(request.profissao());

        if (request.empregadoras() != null) {
            for (EmpregadoraDTO dto : request.empregadoras()) {
                cliente.adicionarEmpregadora(new EntidadeEmpregadora(dto.nome(), dto.rendimento()));
            }
        }
    }

    private ClienteResponse toResponse(Cliente cliente) {
        List<EmpregadoraDTO> empregadoras = cliente.getEmpregadoras().stream()
                .map(e -> new EmpregadoraDTO(e.getNome(), e.getRendimento()))
                .toList();

        return new ClienteResponse(
                cliente.getId(),
                cliente.getRg(),
                cliente.getCpf(),
                cliente.getNome(),
                cliente.getEndereco(),
                cliente.getProfissao(),
                empregadoras
        );
    }
}
