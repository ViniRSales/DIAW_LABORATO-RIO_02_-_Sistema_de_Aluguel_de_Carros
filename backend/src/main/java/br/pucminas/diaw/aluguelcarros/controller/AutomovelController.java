package br.pucminas.diaw.aluguelcarros.controller;

import br.pucminas.diaw.aluguelcarros.dto.automovel.AutomovelRequest;
import br.pucminas.diaw.aluguelcarros.dto.automovel.AutomovelResponse;
import br.pucminas.diaw.aluguelcarros.service.AutomovelService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Cadastro de automoveis disponiveis para aluguel.
 */
@RestController
@RequestMapping("/api/automoveis")
public class AutomovelController {

    private final AutomovelService automovelService;

    public AutomovelController(AutomovelService automovelService) {
        this.automovelService = automovelService;
    }

    @GetMapping
    public List<AutomovelResponse> listar() {
        return automovelService.listar();
    }

    @GetMapping("/{id}")
    public AutomovelResponse buscar(@PathVariable Long id) {
        return automovelService.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<AutomovelResponse> criar(@Valid @RequestBody AutomovelRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(automovelService.criar(request));
    }

    @PutMapping("/{id}")
    public AutomovelResponse atualizar(@PathVariable Long id, @Valid @RequestBody AutomovelRequest request) {
        return automovelService.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        automovelService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
