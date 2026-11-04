package br.pucminas.diaw.aluguelcarros.controller;

import br.pucminas.diaw.aluguelcarros.dto.pedido.PedidoRequest;
import br.pucminas.diaw.aluguelcarros.dto.pedido.PedidoResponse;
import br.pucminas.diaw.aluguelcarros.service.PedidoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Operacoes sobre pedidos de aluguel (protótipo do sistema).
 * Clientes criam/modificam/cancelam; agentes avaliam.
 */
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<PedidoResponse> listar() {
        return pedidoService.listar();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<PedidoResponse> listarPorCliente(@PathVariable Long clienteId) {
        return pedidoService.listarPorCliente(clienteId);
    }

    @GetMapping("/{id}")
    public PedidoResponse buscar(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PostMapping("/cliente/{clienteId}")
    public ResponseEntity<PedidoResponse> criar(@PathVariable Long clienteId,
                                                @Valid @RequestBody PedidoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.criar(clienteId, request));
    }

    @PutMapping("/{id}")
    public PedidoResponse modificar(@PathVariable Long id, @Valid @RequestBody PedidoRequest request) {
        return pedidoService.modificar(id, request);
    }

    @PutMapping("/{id}/cancelar")
    public PedidoResponse cancelar(@PathVariable Long id) {
        return pedidoService.cancelar(id);
    }

    @PutMapping("/{id}/avaliar")
    @PreAuthorize("hasRole('AGENTE')")
    public PedidoResponse avaliar(@PathVariable Long id, @RequestParam boolean parecerPositivo) {
        return pedidoService.avaliar(id, parecerPositivo);
    }
}
