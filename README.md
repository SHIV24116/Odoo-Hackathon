# 🚚 TransitOps

<p align="center">

### Smart Transport Operations Platform

A modern Fleet Operations & Transportation Management System developed for the **Odoo Hackathon** using **React, Node.js, Express, PostgreSQL, and Prisma ORM**.

</p>

---

## 📖 Overview

TransitOps is a centralized platform for managing an organization's transportation operations.

The system enables fleet managers to:

- 🚚 Manage vehicles
- 👨‍✈️ Manage drivers
- 🛣️ Track trips
- 🔧 Schedule maintenance
- ⛽ Monitor fuel & expenses
- 📊 Generate operational analytics
- 🔐 Secure access using Role-Based Authentication

---

# ✨ Features

### 🔐 Authentication

- JWT Authentication
- Role-Based Access Control (RBAC)
- Secure Login
- Protected Routes

---

### 🚚 Fleet Management

- Vehicle Registration
- Vehicle Availability
- Capacity Tracking
- Vehicle Status
- Vehicle History

---

### 👨‍✈️ Driver Management

- Driver Profiles
- License Validation
- Driver Availability
- Safety Score

---

### 🛣️ Trip Management

- Create Trips
- Assign Vehicles
- Assign Drivers
- Cargo Management
- Trip Status Tracking

---

### 🔧 Maintenance

- Schedule Maintenance
- Vehicle Service History
- Maintenance Records

---

### ⛽ Fuel & Expense

- Fuel Logs
- Expense Tracking
- Toll Records
- Operational Cost

---

### 📊 Analytics

- Fleet Utilization
- Vehicle Statistics
- Driver Statistics
- Operational Reports
- Dashboard Charts

---

# 🛠 Tech Stack

## Frontend

- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```text
TransitOps
│
├── Frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── styles
│   │   └── utils
│   │
│   └── package.json
│
├── Backend
│   └── server
│       ├── prisma
│       ├── src
│       │   ├── config
│       │   ├── controllers
│       │   ├── middleware
│       │   ├── routes
│       │   ├── services
│       │   ├── utils
│       │   └── validations
│       │
│       └── package.json
│
├── assets
│   ├── login-page.png
│   └── dashboard.png
│
└── README.md
```

---

# 🗄 Database

The application uses **PostgreSQL** with **Prisma ORM**.

Main Entities:

- Users
- Vehicles
- Drivers
- Trips
- Maintenance
- Fuel Logs
- Expenses

---

# 📌 Business Rules

- Unique Vehicle Registration Number
- Driver License Validation
- Vehicle Availability Check
- Driver Availability Check
- Automatic Vehicle Status Updates
- Automatic Driver Status Updates
- Maintenance Workflow
- Expense Tracking

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/SHIV24116/Odoo-Hackathon.git
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## Backend

```bash
cd Backend/server

npm install

npx prisma generate

npm run dev
```

---

# 🔑 Environment Variables

### Backend

```env
DATABASE_URL=

JWT_SECRET=

PORT=
```

### Frontend

```env
VITE_API_URL=http://localhost:5000
```

---

# 📡 API Endpoints

```
/api/auth

/api/vehicles

/api/drivers

/api/trips

/api/maintenance

/api/expenses

/api/reports
```

---

# 🚀 Future Scope

- Live GPS Tracking
- Google Maps Integration
- Email Notifications
- Predictive Maintenance
- AI Route Optimization
- Mobile App
- PDF Reports
- CSV Export

---

# 👥 Team

Developed during the **Odoo Hackathon** using collaborative Git workflow and feature-based development.

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.
