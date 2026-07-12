import Panel from '../components/common/Panel'
import Page from '../components/common/Page'
import ExpenseChart from '../components/dashboard/ExpenseChart'
import ReportCards from '../components/reports/ReportCards'
import { getAnalytics } from '../services/reportService'

function Reports() {
  const analytics = getAnalytics()
  return (
    <Page title="Reports & Analytics">
      <ReportCards analytics={analytics} />
      <div className="two-column"><Panel title="Monthly revenue"><ExpenseChart values={analytics.monthlyRevenue} /></Panel><Panel title="Top costliest vehicles"><ExpenseChart values={analytics.topCostVehicles} /></Panel></div>
    </Page>
  )
}

export default Reports
