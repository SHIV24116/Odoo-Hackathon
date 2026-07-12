import StatCard from '../dashboard/StatCard'
import { formatCurrency, percent } from '../../utils/formatters'

function ReportCards({ analytics }) {
  const cards = [
    { label: 'Fuel efficiency', value: `${analytics.fuelEfficiency.toFixed(1)} km/L` },
    { label: 'Fleet utilization', value: percent(analytics.fleetUtilization) },
    { label: 'Operational cost', value: formatCurrency(analytics.operationalCost) },
    { label: 'Vehicle ROI', value: percent(analytics.vehicleRoi) },
  ]
  return <div className="stats-grid four">{cards.map((card) => <StatCard key={card.label} {...card} />)}</div>
}

export default ReportCards
