import api from './api'

// Chamadas HTTP do CRUD de cliente.
export const clienteService = {
  listar: () => api.get('/clientes').then((r) => r.data),
  buscar: (id) => api.get(`/clientes/${id}`).then((r) => r.data),
  criar: (dados) => api.post('/clientes', dados).then((r) => r.data),
  atualizar: (id, dados) => api.put(`/clientes/${id}`, dados).then((r) => r.data),
  remover: (id) => api.delete(`/clientes/${id}`)
}
