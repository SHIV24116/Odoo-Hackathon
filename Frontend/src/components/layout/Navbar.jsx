import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import SearchBar from '../common/SearchBar'

function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <SearchBar />
      <div className="topbar-actions">
        <span>Range: all</span>
        <button onClick={handleLogout}>Sign out</button>
        <div className="avatar">{user?.role?.slice(0, 2).toUpperCase() || 'FM'}</div>
      </div>
    </header>
  )
}

export default Navbar

