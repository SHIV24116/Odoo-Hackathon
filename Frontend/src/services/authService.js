export async function loginUser(credentials) {
  return {
    id: 'user-1',
    name: credentials.role || 'Fleet Manager',
    email: credentials.email,
    role: credentials.role || 'Fleet Manager',
  }
}

export async function logoutUser() {
  return true
}
