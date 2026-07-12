import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { useAuth } from '../context/useAuth'

function Login() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'manager@transitops.in', password: 'password', role: 'Fleet Manager' })

  if (isAuthenticated) return <Navigate replace to="/dashboard" />

  async function handleSubmit(event) {
    event.preventDefault()
    await login(form)
    navigate('/dashboard')
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  return (
    <div className="login-page">
      <section className="brand-panel">
        <div className="brand-mark">TO</div>
        <h1>TransitOps</h1>
        <p>Smart Transport Operations Platform</p>
        <div className="role-list"><span>One login for roles</span><b>Fleet Manager</b><b>Dispatcher</b><b>Safety Officer</b><b>Financial Analyst</b></div>
        <small>Transport and fleet management</small>
      </section>
      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Sign in to your account</h2>
          <p>Enter your credentials to continue.</p>
          <label>Email<input name="email" onChange={updateField} type="email" value={form.email} /></label>
          <label>Password<input name="password" onChange={updateField} type="password" value={form.password} /></label>
          <label>Role<select name="role" onChange={updateField} value={form.role}><option>Fleet Manager</option><option>Dispatcher</option><option>Safety Officer</option><option>Financial Analyst</option></select></label>
          <div className="form-row between"><label className="check"><input defaultChecked type="checkbox" /> Remember me</label><a href="#forgot">Forgot password?</a></div>
          <Button type="submit">Sign in</Button>
          <div className="role-note">Access changes by role: manager, dispatcher, safety, and finance modules.</div>
        </form>
      </section>
    </div>
  )
}

export default Login

