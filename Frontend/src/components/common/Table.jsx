function Table({ title, columns, data }) {
  return (
    <section className="table-wrap">
      {title && <h3>{title}</h3>}
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || row.code || row.role}>
              {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Table
