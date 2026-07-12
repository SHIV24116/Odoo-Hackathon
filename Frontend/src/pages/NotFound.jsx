import { Link } from 'react-router-dom'
import Page from '../components/common/Page'

function NotFound() {
  return <Page title="Page not found"><Link to="/dashboard">Back to dashboard</Link></Page>
}

export default NotFound
