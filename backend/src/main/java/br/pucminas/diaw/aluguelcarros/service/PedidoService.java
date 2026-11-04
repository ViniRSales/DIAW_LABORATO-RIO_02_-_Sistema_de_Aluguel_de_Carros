package br.pucminas.diaw.aluguelcarros.service;

import br.pucminas.diaw.aluguelcarros.dto.pedido.PedidoRequest;
import br.pucminas.diaw.aluguelcarros.dto.pedido.PedidoResponse;
import br.pucminas.diaw.aluguelcarros.exception.RecursoNaoEncontradoException;
import br.pucminas.diaw.aluguelcarros.exception.RegraNegocioException;
import br.pucminas.diaw.aluguelcarros.model.Automovel;
import br.pucminas.diaw.aluguelcarros.model.Cliente;
import br.pucminas.diaw.aluguelcarros.model.PedidoAluguel;
import br.pucminas.diaw.aluguelcarros.model.StatusPedido;
import br.pucminas.diaw.aluguelcarros.repository.ClienteRepository;
import br.pucminas.diaw.aluguelcarros.repository.PedidoAluguelRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Regras de negocio dos pedidos de aluguel: criacao, modificacao,
 * consulta, cancelamento e avaliacao (parecer dos agentes).
 */
@Service
public class PedidoService {

    private final PedidoAluguelRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final AutomovelService automovelService;

    public PedidoService(PedidoAluguelRepository pedidoRepository,
                         ClienteRepository clienteRepository,
                         AutomovelService automovelService) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.automovelService = automovelService;
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listar() {
        return pedidoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarPorCliente(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public PedidoResponse buscarPorId(Long id) {
        return toResponse(buscarEntidade(id));
    }

    @Transactional
    public PedidoResponse criar(Long clienteId, PedidoRequest request) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente nao encontrado: " + clienteId));
        Automovel automovel = automovelService.buscarEntidade(request.automovelId());

        PedidoAluguel pedido = new PedidoAluguel();
        pedido.setCliente(cliente);
        pedido.setAutomovel(automovel);
        pedido.setValorMensal(request.valorMensal());
        pedido.setStatus(StatusPedido.CRIADO);

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse modificar(Long id, PedidoRequest request) {
        PedidoAluguel pedido = buscarEntidade(id);
        if (pedido.getStatus() == StatusPedido.CONTRATADO || pedido.getStatus() == StatusPedido.CANCELADO) {
            throw new RegraNegocioException("Pedido nao pode ser modificado no status atual: " + pedido.getStatus());
        }
        pedido.setAutomovel(automovelService.buscarEntidade(request.automovelId()));
        pedido.setValorMensal(request.valorMensal());
        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse cancelar(Long id) {
        PedidoAluguel pedido = buscarEntidade(id);
        if (pedido.getStatus() == StatusPedido.CONTRATADO) {
            throw new RegraNegocioException("Pedido ja contratado nao pode ser cancelado");
        }
        pedido.setStatus(StatusPedido.CANCELADO);
        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse avaliar(Long id, boolean parecerPositivo) {
        PedidoAluguel pedido = buscarEntidade(id);
        pedido.setStatus(parecerPositivo ? StatusPedido.APROVADO : StatusPedido.REPROVADO);
        return toResponse(pedidoRepository.save(pedido));
    }

    private PedidoAluguel buscarEntidade(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado: " + id));
    }

    private PedidoResponse toResponse(PedidoAluguel p) {
        String descricaoAutomovel = null;
        Long automovelId = null;
        if (p.getAutomovel() != null) {
            automovelId = p.getAutomovel().getId();
            descricaoAutomovel = p.getAutomovel().getMarca() + " " + p.getAutomovel().getModelo()
                    + " (" + p.getAutomovel().getPlaca() + ")";
        }
        return new PedidoResponse(
                p.getId(),
                p.getDataCriacao(),
                p.getStatus(),
                p.getValorMensal(),
                p.getCliente() != null ? p.getCliente().getId() : null,
                p.getCliente() != null ? p.getCliente().getNome() : null,
                automovelId,
                descricaoAutomovel
        );
    }
}
