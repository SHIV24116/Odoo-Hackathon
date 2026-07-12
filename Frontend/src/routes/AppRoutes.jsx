import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import Drivers from '../pages/Drivers'
import Expenses from '../pages/Expenses'
import Login from '../pages/Login'
import Maintenance from '../pages/Maintenance'
import NotFound from '../pages/NotFound'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import Trips from '../pages/Trips'
import Vehicles from '../pages/Vehicles'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route element={<Navigate replace to="/dashboard" />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Vehicles />} path="/fleet" />
          <Route element={<Drivers />} path="/drivers" />
          <Route element={<Trips />} path="/trips" />
          <Route element={<Maintenance />} path="/maintenance" />
          <Route element={<Expenses />} path="/expenses" />
          <Route element={<Reports />} path="/analytics" />
          <Route element={<Settings />} path="/settings" />
        </Route>
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}

export default AppRoutes
