<<<<<<< HEAD
function Footer() {
  return null
}

export default Footer
=======
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
>>>>>>> 570cc98e9f72169d8aee359744c922b443c2483a
