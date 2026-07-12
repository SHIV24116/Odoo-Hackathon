function Badge({ children }) {
  const key = String(children).toLowerCase().replaceAll(' ', '-')
  return <span className={`badge badge-${key}`}>{children}</span>
}

export default Badge
