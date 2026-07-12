import Button from '../components/common/Button'
import FormGrid from '../components/common/FormGrid'
import Page from '../components/common/Page'
import Panel from '../components/common/Panel'
import Table from '../components/common/Table'
import { getRoles } from '../services/fleetDataService'

const roleColumns = [
  { key: 'role', label: 'Role' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'fleet', label: 'Fleet' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'trips', label: 'Trips' },
  { key: 'analytics', label: 'Analytics' },
]

const profileFields = [
  { name: 'organization', label: 'Organization' },
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
]

function Settings() {
  const roles = getRoles()
  return (
    <Page title="Settings & RBAC">
      <div className="split-workbench"><Panel title="Profile"><FormGrid fields={profileFields} /><Button>Save changes</Button></Panel><Table title="Role based access quick view" columns={roleColumns} data={roles} /></div>
    </Page>
  )
}

export default Settings
