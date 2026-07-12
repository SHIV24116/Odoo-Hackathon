import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="workspace">
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
