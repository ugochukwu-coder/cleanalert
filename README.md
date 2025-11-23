# CleanAlert 🌍

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://cleanalert-ivory.vercel.app/) 
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)]()

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
  - [Issue Reporting](#issue-reporting)
  - [Report Tracking & Visibility](#report-tracking--visibility)
  - [User Authentication](#user-authentication)
  - [Platform Support](#platform-support)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [User Guide](#user-guide)
  - [Run Locally](#run-locally)
- [Support the Project](#support-the-project)
  - [Donations](#donations)
- [Technical Details](#technical-details)
- [License](#license)

---

## Project Overview
CleanAlert is a community-driven web platform dedicated to promoting cleaner and safer environments. It empowers citizens to actively participate in local cleanup efforts by providing a simple and centralized way to report waste issues, garbage dumps, and unclean environments in their communities.

The platform serves as a vital link between concerned residents and local authorities or community organizations, ensuring that environmental concerns are tracked, visible, and addressed promptly. Our core mission is to leverage collective effort to keep communities clean and safe for everyone.

---

## Key Features

### Issue Reporting
**Report an Issue (`/report`)**:  
Users can easily log a new report detailing the location, type, and severity of an environmental hazard or waste issue. This is the primary function for crowdsourcing data on local sanitation problems.

### Report Tracking & Visibility
**View Reports (`/reports`)**:  
All submitted reports are visible on a central dashboard or map interface, allowing users and organizations to track the status of reported issues and see where environmental needs are most pressing.

### User Authentication
**Login / Sign Up (`/auth/login`, `/auth/signup`)**:  
Secure user accounts allow individuals to manage their submitted reports, track issue resolution, and participate fully in the platform's features.

### Platform Support
**Donate (`/donate`)**:  
A feature allowing community members to contribute financially to the platform's sustainability. Donations are earmarked to help maintain the platform, support scheduled cleanup drives, and encourage broader community participation.

---

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js & npm (if running locally)

### User Guide
1. **Access the Platform:**  
   Navigate to the live URL: [https://cleanalert-ivory.vercel.app](https://cleanalert-ivory.vercel.app/)

2. **Create an Account:**  
   Click "Get Started" or "Sign Up" to register a new account.

3. **Report an Issue:**  
   Once logged in, click "Report Issue" to submit a new environmental concern. Provide accurate details and location information.

4. **Monitor Progress:**  
   Click "View Reports" to see your submitted reports and the status of other issues across the community.

### Run Locally
To run the project on your machine:

```bash
# Clone the repository
git clone <my repo above>
cd cleanalert

# If monorepo, navigate to backend first
cd backend

# Install dependencies
npm install

# Start the backend
npm run dev

# For frontend, in another terminal
cd ../frontend
npm install
npm run dev

Admin Login (Testing)

To view or modify the admin credentials used for testing, check the script located at:

backend/script/createAdmin.js
