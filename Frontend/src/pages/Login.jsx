import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { useAuth } from '../context/useAuth'
import { signupUser } from '../services/authService'

function Login() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', roleId: 1 })
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate replace to="/dashboard" />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      if (mode === 'signup') {
        await signupUser(form)
        setMode('login')
        return
      }
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
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
          <h2>{mode === 'login' ? 'Sign in to your account' : 'Create an account'}</h2>
          <p>{mode === 'login' ? 'Enter your credentials to continue.' : 'Create a demo user backed by PostgreSQL.'}</p>
          {mode === 'signup' && <label>Name<input name="name" onChange={updateField} value={form.name} /></label>}
          <label>Email<input name="email" onChange={updateField} type="email" value={form.email} /></label>
          <label>Password<input name="password" onChange={updateField} type="password" value={form.password} /></label>
          {mode === 'signup' && <label>Role<select name="roleId" onChange={updateField} value={form.roleId}><option value="1">Fleet Manager</option><option value="2">Dispatcher</option><option value="3">Safety Officer</option></select></label>}
          {error && <p className="error-text">{error}</p>}
          <Button type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</Button>
          <button className="link-button" onClick={() => { setError(''); setMode(mode === 'login' ? 'signup' : 'login') }} type="button">{mode === 'login' ? 'Create account' : 'Back to sign in'}</button>
          <div className="role-note">Use a real account from the backend auth APIs.</div>
        </form>
      </section>
    </div>
  )
}

export default Login

