package br.pucminas.diaw.aluguelcarros.exception;

/**
 * Lancada quando uma regra de negocio e violada.
 */
public class RegraNegocioException extends RuntimeException {

    public RegraNegocioException(String mensagem) {
        super(mensagem);
    }
}
