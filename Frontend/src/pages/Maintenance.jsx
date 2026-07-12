import Button from '../components/common/Button'
import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import MaintenanceForm from '../components/maintenance/MaintenanceForm'
import MaintenanceTable from '../components/maintenance/MaintenanceTable'
import { getMaintenanceLogs } from '../services/maintenanceService'
import { getVehicles } from '../services/vehicleService'

function Maintenance() {
  const logs = getMaintenanceLogs()
  const vehicles = getVehicles()
  return (
    <Page title="Maintenance">
      <div className="split-workbench"><Panel title="Log service record"><MaintenanceForm vehicles={vehicles} /><Button>Save</Button><p className="rule-text">Active maintenance changes vehicle status to In Shop.</p></Panel><MaintenanceTable logs={logs} /></div>
    </Page>
  )
}

export default Maintenance
