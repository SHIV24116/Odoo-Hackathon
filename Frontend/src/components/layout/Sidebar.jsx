import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/mockData'

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>TransitOps</h2>
      <nav>
        {navItems.map((item) => (
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} key={item.path} to={item.path}>{item.label}</NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar