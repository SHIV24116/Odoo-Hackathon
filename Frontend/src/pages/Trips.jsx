import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import TripForm from '../components/trip/TripForm'
import TripTable from '../components/trip/TripTable'
import { getDrivers } from '../services/driverService'
import { getTrips } from '../services/tripService'
import { getVehicles } from '../services/vehicleService'

function Trips() {
  const trips = getTrips()
  const availableVehicles = getVehicles().filter((vehicle) => vehicle.status === 'Available')
  const availableDrivers = getDrivers().filter((driver) => driver.status === 'Available')
  return (
    <Page title="Trip Dispatcher">
      <div className="split-workbench"><Panel title="Create trip"><TripForm availableDrivers={availableDrivers} availableVehicles={availableVehicles} /></Panel><TripTable trips={trips} /></div>
    </Page>
  )
}

export default Trips
