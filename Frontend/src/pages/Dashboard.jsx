import Badge from '../components/common/Badge'
import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import Table from '../components/common/Table'
import StatCard from '../components/dashboard/StatCard'
import VehicleChart from '../components/dashboard/VehicleChart'
import { getDashboardMetrics, getTrips, getVehicleStatusChart } from '../services/fleetDataService'
import { formatCapacity } from '../utils/formatters'

const tripColumns = [
  { key: 'code', label: 'Trip' },
  { key: 'vehicle', label: 'Vehicle', render: (trip) => trip.vehicle?.name || '-' },
  { key: 'driver', label: 'Driver', render: (trip) => trip.driver?.name || 'Unassigned' },
  { key: 'status', label: 'Status', render: (trip) => <Badge>{trip.status}</Badge> },
  { key: 'cargoWeightKg', label: 'Wt', render: (trip) => formatCapacity(trip.cargoWeightKg) },
]

function Dashboard() {
  const metrics = getDashboardMetrics()
  const trips = getTrips()
  const vehicleStatus = getVehicleStatusChart()
  return (
    <Page title="Dashboard">
      <div className="filters"><select><option>Vehicle type: all</option></select><select><option>Status: all</option></select><select><option>Region: all</option></select></div>
      <div className="stats-grid">{metrics.map((metric) => <StatCard key={metric.label} {...metric} />)}</div>
      <div className="two-column"><Table title="Recent trips" columns={tripColumns} data={trips} /><Panel title="Vehicle status"><VehicleChart values={vehicleStatus} /></Panel></div>
    </Page>
  )
}

export default Dashboard
