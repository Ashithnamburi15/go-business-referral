# Go Business - Referral Dashboard

A secure, responsive, and intuitive web-based referral management system built for **Go Business**. This application allows partners to log in, view key performance metrics, copy referral codes, search and sort referral histories, and inspect specific referral records in detail.

---

## ✨ Features

- **🔒 Secure Authentication:** JWT-based protection with session cookies (`jwt_token`).
- **📊 Interactive Overview Panel:** Real-time metrics grid showcasing total referrals, active referrals, and total earnings.
- **💼 Service Summary:** Clean visual breakdown of referrals and earnings per service tier.
- **🔗 Share Referral Widget:** Quick clip-to-copy helper fields for referral links and referral codes.
- **📅 All Referrals Table:**
  - Dynamic name/service search (sends live API filter query `?search=`).
  - Date sorting controls (descending/ascending `?sort=`).
  - Client-side pagination (10 rows per page with numbered pages).
  - Timezone-safe date formatting (`YYYY/MM/DD`).
  - Currency formatting (`USD` en-US style).
- **🔎 Detailed Referral View:** Specialized deep link inspector pages (`/referral/:id`).
- **🎨 Premium Aesthetics:** Responsive dark-mode layout, glassmorphism card panels (`backdrop-filter: blur`), custom Plus Jakarta Sans typography, and fluid micro-animations (hover lifts, fade-ins).

---

## 📁 Project Structure

This project has been restructured in a clean, modular format:

```text
src/
├── api/
│   ├── auth.js            # Handles cookie storage and login API POST calls
│   └── referrals.js       # Handles API GET queries for dashboard and detail views
├── components/
│   ├── ProtectedRoute.jsx # Route guard verifying cookie presence
│   ├── Navbar.jsx         # Header & Footer shell templates
│   ├── Overview.jsx       # Overview grids and summary cards
│   └── ReferralTable.jsx  # Table layout and formatted row components
├── pages/
│   ├── Login.jsx          # Login form view
│   ├── Dashboard.jsx      # Main dashboard view combining all widgets
│   ├── ReferralDetails.jsx# Individual referral detail page
│   └── NotFound.jsx       # Fallback 404 page
├── App.js                 # Routing rules and import mappings
├── App.css                # Premium responsive styling & dark-theme variables
├── index.js               # Entry point mounting <App />
└── index.css              # Reset standard margin/typography rules
```

---

## 🛠️ Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (LTS recommended)
* npm (comes with Node.js)

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Running Locally
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 4. Build for Production
To build a optimized bundle for production:
```bash
npm run build
```

---

## 🧪 Credentials (Testing)

Use these credentials to log in on the `/login` route:
* **Email:** `admin@example.com`
* **Password:** `admin123`
