// Formatea un número como precio en ARS
// Ej: 89990 → "$89.990"
export const formatARS = (numero) =>
  '$' + Math.round(numero).toLocaleString('es-AR')

// Formatea cuotas
// Ej: calcCuota(89990, 12) → "$7.499/mes"
export const calcCuota = (total, cuotas = 12) =>
  formatARS(Math.round(total / cuotas)) + '/mes'
