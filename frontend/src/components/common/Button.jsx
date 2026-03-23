function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'bg-accent-500 text-ink-900 hover:bg-accent-400',
    ghost: 'border border-white/15 bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white',
    danger: 'border border-red-400/30 bg-red-400/10 text-red-300 hover:bg-red-400/20',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
