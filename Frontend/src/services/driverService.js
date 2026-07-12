import api from './axios'

const toDriverView = (driver) => ({
  ...driver,
  category: driver.licenseCategory,
  contact: driver.contactNumber,
  status: driver.status?.replaceAll('_', ' '),
})

export async function getDrivers() {
  const { data } = await api.get('/drivers')
  return data.map(toDriverView)
}

export async function createDriver(driver) {
  const payload = {
    name: driver.name,
    licenseNumber: driver.licenseNumber,
    licenseCategory: driver.category,
    licenseExpiry: driver.licenseExpiry,
    contactNumber: driver.contact,
    safetyScore: Number(driver.safetyScore || 90),
  }
  const { data } = await api.post('/drivers', payload)
  return toDriverView(data)
}
