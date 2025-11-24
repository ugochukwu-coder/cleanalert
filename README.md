# CleanAlert 🌍
[Live Demo](https://cleanalert-ivory.vercel.app) | License

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [User Guide](#user-guide)
- [Run Locally](#run-locally)
- [Support the Project](#support-the-project)
- [Technical Details](#technical-details)
- [Cloudinary Integration](#cloudinary-integration)
- [License](#license)

---

## Project Overview
CleanAlert is a community-driven web platform dedicated to promoting cleaner and safer environments. It empowers citizens to actively participate in local cleanup efforts by providing a simple and centralized way to report waste issues, garbage dumps, and unclean environments in their communities.

The platform serves as a vital link between concerned residents and local authorities or community organizations, ensuring that environmental concerns are tracked, visible, and addressed promptly. Our core mission is to leverage collective effort to keep communities clean and safe for everyone.

---

## Key Features

### Issue Reporting
**Report an Issue (/report):**  
Users can easily log a new report detailing the location, type, and severity of an environmental hazard or waste issue. This is the primary function for crowdsourcing data on local sanitation problems.

### Report Tracking & Visibility
**View Reports (/reports):**  
All submitted reports are visible on a central dashboard or map interface, allowing users and organizations to track the status of reported issues and see where environmental needs are most pressing.

### User Authentication
**Login / Sign Up (/auth/login, /auth/signup):**  
Secure user accounts allow individuals to manage their submitted reports, track issue resolution, and participate fully in the platform's features.

### Platform Support
**Donate (/donate):**  
A feature allowing community members to contribute financially to the platform's sustainability. Donations are earmarked to help maintain the platform, support scheduled cleanup drives, and encourage broader community participation.

---

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js & npm (if running locally)

### User Guide
1. **Access the Platform:** Navigate to the live URL: [https://cleanalert-ivory.vercel.app](https://cleanalert-ivory.vercel.app)
2. **Create an Account:** Click "Get Started" or "Sign Up" to register a new account.
3. **Report an Issue:** Once logged in, click "Report Issue" to submit a new environmental concern. Provide accurate details and location information.
4. **Monitor Progress:** Click "View Reports" to see your submitted reports and the status of other issues across the community.

---

## Run Locally

```bash
# Clone the repository
git clone <your-repo-url>
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

bash
Copy code
backend/script/createAdmin.js
Support the Project
Donations: Support the platform’s sustainability and local cleanup efforts.

Technical Details
Frontend: Next.js with Tailwind CSS

Backend: Node.js / Express

Database: MongoDB

Image Hosting: Cloudinary

Cloudinary Integration
Flow Diagram
mermaid
Copy code
flowchart LR
    A[User selects image] --> B[Frontend Preview using URL.createObjectURL()]
    B --> C[Form submission with image in FormData]
    C --> D[Backend receives image]
    D --> E[Backend uploads image to Cloudinary]
    E --> F[Cloudinary returns secure URL]
    F --> G[Backend saves report in MongoDB with image URL]
    G --> H[Frontend fetches report data with Cloudinary URL]
    H --> I[Next.js <Image> renders optimized image]
Description
User selects an image: Frontend previews image locally.

Form submission: Image file is sent in FormData to backend.

Backend uploads to Cloudinary: Using Cloudinary SDK/API.

Cloudinary returns URL: The secure hosted image URL is returned.

Database storage: Backend stores report with image URL in MongoDB.

Frontend displays image: Using <Image> from Next.js for optimized rendering.

License
This project is licensed under the MIT License.
