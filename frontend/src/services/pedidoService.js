import api from './api'

// Chamadas HTTP dos pedidos de aluguel e dos automoveis.
export const pedidoService = {
  listar: () => api.get('/pedidos').then((r) => r.data),
  criar: (clienteId, dados) => api.post(`/pedidos/cliente/${clienteId}`, dados).then((r) => r.data),
  cancelar: (id) => api.put(`/pedidos/${id}/cancelar`).then((r) => r.data),
  avaliar: (id, parecerPositivo) =>
    api.put(`/pedidos/${id}/avaliar?parecerPositivo=${parecerPositivo}`).then((r) => r.data)
}

export const automovelService = {
  listar: () => api.get('/automoveis').then((r) => r.data),
  criar: (dados) => api.post('/automoveis', dados).then((r) => r.data)
}

export const clienteLookup = {
  listar: () => api.get('/clientes').then((r) => r.data)
}
