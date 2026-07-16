import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import MaintenanceTable from '../components/maintenance/MaintenanceTable'
import { createMaintenance, getMaintenanceLogs } from '../services/maintenanceService'
import { getVehicles } from '../services/vehicleService'

function Maintenance() {
  const [logs, setLogs] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [error, setError] = useState('')
  const [form, setForm] = useState({ vehicleId: '', serviceType: '', cost: '', status: 'ACTIVE' })

  async function loadData() {
    const [nextLogs, nextVehicles] = await Promise.all([getMaintenanceLogs(), getVehicles()])
    setLogs(nextLogs)
    setVehicles(nextVehicles)
  }

  useEffect(() => { loadData().catch((err) => setError(err.response?.data?.message || err.message)) }, [])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    try {
      await createMaintenance(form)
      setForm({ vehicleId: '', serviceType: '', cost: '', status: 'ACTIVE' })
      await loadData()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  return (
    <Page title="Maintenance">
      <div className="split-workbench"><Panel title="Log service record"><form className="form-grid" onSubmit={submit}>
        <label>Vehicle<select name="vehicleId" value={form.vehicleId} onChange={updateField}><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select></label>
        <label>Service type<input name="serviceType" value={form.serviceType} onChange={updateField} /></label>
        <label>Cost<input name="cost" type="number" min="0" value={form.cost} onChange={updateField} /></label>
        <label>Status<select name="status" value={form.status} onChange={updateField}><option value="ACTIVE">Active</option><option value="COMPLETED">Completed</option></select></label>
        <Button type="submit">Save</Button>
      </form><p className="rule-text">Active maintenance changes vehicle status to In Shop.</p></Panel><MaintenanceTable logs={logs} /></div>
      {error && <p className="error-text">{error}</p>}
    </Page>
  )
}

export default Maintenance
