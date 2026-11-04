package br.pucminas.diaw.aluguelcarros.model;

/**
 * Estados possiveis de um pedido de aluguel ao longo do seu ciclo de vida.
 */
public enum StatusPedido {
    CRIADO,
    EM_ANALISE,
    APROVADO,
    REPROVADO,
    CANCELADO,
    CONTRATADO
}
