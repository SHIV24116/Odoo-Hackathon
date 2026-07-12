function FormGrid({ fields }) {
  return (
    <div className="form-grid">
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          {field.type === 'select' ? (
            <select defaultValue="">
              <option value="">Select {field.label.toLowerCase()}</option>
              {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          ) : (
            <input placeholder={field.placeholder || field.label} type={field.type || 'text'} />
          )}
        </label>
      ))}
    </div>
  )
}

export default FormGrid