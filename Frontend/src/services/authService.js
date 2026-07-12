import api from './axios'

export async function loginUser(credentials) {
  const { data } = await api.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  })

  localStorage.setItem('token', data.token)
  return data.user
}

export async function signupUser(user) {
  const { data } = await api.post('/auth/signup', {
    name: user.name,
    email: user.email,
    password: user.password,
    roleId: Number(user.roleId || 1),
  })

  return data.user
}

export async function logoutUser() {
  localStorage.removeItem('token')
  return true
}
