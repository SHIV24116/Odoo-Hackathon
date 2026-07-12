import Button from '../components/common/Button'
import Page from '../components/common/Page'
import VehicleTable from '../components/vehicle/VehicleTable'
import { getVehicles } from '../services/vehicleService'

function Vehicles() {
  const vehicles = getVehicles()
  return (
    <Page title="Vehicle Registry">
      <div className="toolbar"><select><option>Status: all</option></select><select><option>Type: all</option></select><Button className="small">Add vehicle</Button></div>
      <VehicleTable vehicles={vehicles} />
      <p className="rule-text">Rule: registration number must be unique. Retired and In Shop vehicles stay hidden from dispatch.</p>
    </Page>
  )
}

export default Vehicles
