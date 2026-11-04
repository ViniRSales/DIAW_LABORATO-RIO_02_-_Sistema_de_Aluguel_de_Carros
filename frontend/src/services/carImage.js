// Gera a URL da imagem de um automovel a partir da marca e do modelo,
// usando o CDN publico da Imagin.studio (renderizacao de veiculos).
// Ha um mapa de normalizacao para casar os nomes com os esperados pelo CDN.

const MARCA_MAP = {
  fiat: 'fiat',
  renault: 'renault',
  chevrolet: 'chevrolet',
  hyundai: 'hyundai',
  volkswagen: 'volkswagen',
  toyota: 'toyota',
  jeep: 'jeep'
}

// Alguns modelos precisam de ajuste no "modelFamily" esperado pelo CDN.
const MODELO_MAP = {
  mobi: 'mobi',
  kwid: 'kwid',
  onix: 'onix',
  hb20: 'hb20',
  argo: 'argo',
  virtus: 'virtus',
  corolla: 'corolla',
  creta: 'creta',
  compass: 'compass',
  strada: 'strada',
  polo: 'polo',
  't-cross': 't-cross',
  tcross: 't-cross'
}

function normalizar(texto) {
  return (texto || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function carImageUrl(marca, modelo, { angle = 23, width = 520 } = {}) {
  const make = MARCA_MAP[normalizar(marca)] || normalizar(marca)
  const modeloNorm = normalizar(modelo).replace(/\s+/g, '-')
  const modelFamily = MODELO_MAP[modeloNorm] || modeloNorm

  const params = new URLSearchParams({
    customer: 'img',
    make,
    modelFamily,
    angle: String(angle),
    width: String(width),
    fileType: 'png'
  })
  return `https://cdn.imagin.studio/getimage?${params.toString()}`
}
