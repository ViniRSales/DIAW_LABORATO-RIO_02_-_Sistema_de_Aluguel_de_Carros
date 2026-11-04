package br.pucminas.diaw.aluguelcarros.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Entidade empregadora de um cliente, com o respectivo rendimento auferido.
 * Um cliente pode ter no maximo 3 entidades empregadoras (regra validada na camada de servico).
 */
@Entity
@Table(name = "entidade_empregadora")
public class EntidadeEmpregadora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal rendimento;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public EntidadeEmpregadora() {
    }

    public EntidadeEmpregadora(String nome, BigDecimal rendimento) {
        this.nome = nome;
        this.rendimento = rendimento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getRendimento() {
        return rendimento;
    }

    public void setRendimento(BigDecimal rendimento) {
        this.rendimento = rendimento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
