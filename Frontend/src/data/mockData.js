export const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Trips', path: '/trips' },
  { label: 'Maintenance', path: '/maintenance' },
  { label: 'Fuel & Expenses', path: '/expenses' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Settings', path: '/settings' },
]

export const vehicles = [
  { id: 'veh-1', registrationNumber: 'MH-01-4522', name: 'Van-05', type: 'Van', capacityKg: 500, odometerKm: 72000, acquisitionCost: 4200000, status: 'Available', region: 'Mumbai' },
  { id: 'veh-2', registrationNumber: 'MH-02-8872', name: 'Truck-12', type: 'Truck', capacityKg: 8000, odometerKm: 192000, acquisitionCost: 2490000, status: 'On Trip', region: 'Pune' },
  { id: 'veh-3', registrationNumber: 'MH-04-7610', name: 'Mini-04', type: 'Mini Truck', capacityKg: 1000, odometerKm: 66000, acquisitionCost: 1400000, status: 'In Shop', region: 'Mumbai' },
  { id: 'veh-4', registrationNumber: 'MH-07-3420', name: 'Van-08', type: 'Van', capacityKg: 750, odometerKm: 29400, acquisitionCost: 1040000, status: 'Retired', region: 'Nashik' },
]

export const drivers = [
  { id: 'drv-1', name: 'Aarav', licenseNumber: 'DL-47203', category: 'LMV', licenseExpiry: '2028-12-15', contact: '9876543210', safetyScore: 96, status: 'Available' },
  { id: 'drv-2', name: 'Zain', licenseNumber: 'DL-99100', category: 'HMV', licenseExpiry: '2026-03-10', contact: '9898901204', safetyScore: 91, status: 'Suspended' },
  { id: 'drv-3', name: 'Priya', licenseNumber: 'DL-77014', category: 'LMV', licenseExpiry: '2027-09-20', contact: '9955504412', safetyScore: 94, status: 'On Trip' },
  { id: 'drv-4', name: 'Suresh', licenseNumber: 'DL-60095', category: 'HMV', licenseExpiry: '2025-02-01', contact: '9001122334', safetyScore: 67, status: 'Off Duty' },
]

export const trips = [
  { id: 'trip-1', code: 'TR001', source: 'Warehouse Depot', destination: 'Bandra Hub', vehicleId: 'veh-1', driverId: 'drv-1', cargoWeightKg: 450, plannedDistanceKm: 78, status: 'Dispatched', revenue: 12400 },
  { id: 'trip-2', code: 'TR002', source: 'Pune Industrial Area', destination: 'Bhiwandi Warehouse', vehicleId: 'veh-2', driverId: 'drv-3', cargoWeightKg: 7200, plannedDistanceKm: 165, status: 'Draft', revenue: 26800 },
  { id: 'trip-3', code: 'TR003', source: 'Andheri', destination: 'Sakinaka Depot', vehicleId: 'veh-3', driverId: null, cargoWeightKg: 650, plannedDistanceKm: 22, status: 'Completed', revenue: 6200 },
]

export const maintenanceLogs = [
  { id: 'mnt-1', vehicleId: 'veh-1', serviceType: 'Oil Change', date: '2026-07-03', cost: 2800, status: 'In Shop' },
  { id: 'mnt-2', vehicleId: 'veh-2', serviceType: 'Engine Repair', date: '2026-07-08', cost: 18000, status: 'Completed' },
  { id: 'mnt-3', vehicleId: 'veh-3', serviceType: 'Tyre Replace', date: '2026-07-11', cost: 6200, status: 'In Shop' },
]

export const fuelLogs = [
  { id: 'fuel-1', vehicleId: 'veh-1', date: '2026-07-06', liters: 42, cost: 4980 },
  { id: 'fuel-2', vehicleId: 'veh-2', date: '2026-07-06', liters: 110, cost: 12400 },
  { id: 'fuel-3', vehicleId: 'veh-3', date: '2026-07-06', liters: 32, cost: 3650 },
]

export const expenses = [
  { id: 'exp-1', vehicleId: 'veh-1', type: 'Toll', quantity: 1, cost: 920, status: 'Approved' },
  { id: 'exp-2', vehicleId: 'veh-2', type: 'Permit', quantity: 1, cost: 2600, status: 'Pending' },
  { id: 'exp-3', vehicleId: 'veh-3', type: 'Parking', quantity: 3, cost: 780, status: 'Approved' },
]

export const roles = [
  { id: 'role-1', role: 'Fleet Manager', dashboard: 'View', fleet: 'Edit', drivers: 'Edit', trips: '-', analytics: 'View' },
  { id: 'role-2', role: 'Dispatcher', dashboard: 'View', fleet: '-', drivers: '-', trips: 'Edit', analytics: '-' },
  { id: 'role-3', role: 'Safety Officer', dashboard: 'View', fleet: '-', drivers: 'Edit', trips: '-', analytics: 'View' },
  { id: 'role-4', role: 'Financial Analyst', dashboard: 'View', fleet: '-', drivers: '-', trips: '-', analytics: 'Edit' },
]
