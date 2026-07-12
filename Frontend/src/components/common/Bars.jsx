function Bars({ values }) {
  return (
    <div className="bars">
      {values.map(({ label, value }) => (
        <div className="bar-row" key={label}>
          <span>{label}</span>
          <div><i style={{ width: `${Math.min(value, 100)}%` }} /></div>
        </div>
      ))}
    </div>
  )
}

export default Bars
