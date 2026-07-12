function Input({ label, ...props }) {
  return (
    <label>
      {label}
      <input {...props} />
    </label>
  )
}

export default Input