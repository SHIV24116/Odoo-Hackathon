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

<<<<<<< HEAD
export default Sidebar
=======
export default Sidebar
>>>>>>> 570cc98e9f72169d8aee359744c922b443c2483a
