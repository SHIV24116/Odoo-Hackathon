function Button({ children, className = '', variant = 'primary', ...props }) {
  const buttonClass = variant === 'ghost' ? 'ghost-button' : 'primary-button'
  return <button className={`${buttonClass} ${className}`.trim()} {...props}>{children}</button>
}

export default Button
