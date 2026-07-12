import Badge from '../components/common/Badge'
import Page from '../components/common/Page'
import DriverTable from '../components/driver/DriverTable'
import { getDrivers } from '../services/driverService'

function Drivers() {
  const drivers = getDrivers()
  return (
    <Page title="Drivers & Safety Profiles">
      <DriverTable drivers={drivers} />
      <div className="legend"><Badge>Available</Badge><Badge>On Trip</Badge><Badge>Off Duty</Badge><Badge>Suspended</Badge></div>
      <p className="rule-text">Rule: expired or suspended drivers cannot be assigned to trips.</p>
    </Page>
  )
}

export default Drivers
