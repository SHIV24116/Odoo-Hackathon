export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
}

export function formatCapacity(kg) {
  return kg >= 1000 ? `${kg / 1000} Ton` : `${kg} kg`
}

export function percent(value) {
  return `${Math.round(value)}%`
}
