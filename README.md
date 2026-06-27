# Eventure
# 🎉 Eventure – Microservices-Based Event Management Platform

> A scalable, full-stack event management platform built using the **MERN Stack** and a **6-microservice architecture**. Eventure streamlines the complete event lifecycle, enabling secure authentication, event management, registrations, notifications, and leaderboard tracking through a centralized API Gateway.

---

# 📖 Overview

Eventure is a modern **microservices-based event management platform** designed for colleges and organizations. The platform enables users to discover, register for, and manage events while providing organizers and administrators with powerful management tools.

The application follows a **6-microservice architecture** with an **API Gateway**, making it modular, scalable, and easier to maintain.

---

# ✨ Features

### 🎫 Event Management

* Create, update, and delete events
* Browse and search events
* Event categorization
* Capacity management

### 📝 Event Registration

* Register and cancel event registrations
* View registered events
* Organizer participant management

### 👤 User Management

* User profiles
* Profile updates
* Student and organizer information

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing
* Protected routes
* Role-Based Access Control (RBAC)

### 🔔 Notifications

* Registration confirmations
* Event reminders
* Event updates
* Announcement notifications

### 🏆 Leaderboard

* Student rankings
* Points system
* Achievement tracking

---

# 🏗️ System Architecture

Eventure follows a **6-microservice architecture** connected through a centralized **API Gateway**.

```text
                      React Frontend
                             │
                             ▼
                     API Gateway
                             │
 ┌──────────┬──────────┬─────────────┬──────────────┬──────────────┬──────────────┐
 │          │          │             │              │              │
 ▼          ▼          ▼             ▼              ▼              ▼
Auth     User      Event      Registration   Notification   Leaderboard
Service  Service   Service      Service         Service         Service
```

---

# 🛠️ Tech Stack

| Layer             | Technology                       |
| ----------------- | -------------------------------- |
| Frontend          | React.js + Vite                  |
| Styling           | Tailwind CSS                     |
| Backend           | Node.js + Express.js             |
| Database          | MongoDB + Mongoose               |
| Authentication    | JWT                              |
| Authorization     | Role-Based Access Control (RBAC) |
| API Communication | REST APIs                        |
| Architecture      | Microservices                    |
| API Gateway       | Express Gateway                  |
| Version Control   | Git & GitHub                     |

---

# 👥 User Roles

### 🎓 Student

* Register/Login
* Browse Events
* Register for Events
* View Registrations
* Receive Notifications
* View Leaderboard

### 🎯 Organizer

* Create Events
* Update/Delete Own Events
* Manage Participants
* Send Notifications
* View Registrations

### 👑 Admin

* Manage Users
* Manage Organizers
* Manage Events
* View Platform Analytics
* Full System Access

---

# 📦 Microservices

## 🔐 Authentication Service

* Registration
* Login
* JWT Generation
* Token Verification
* Authentication

## 👤 User Service

* User Profile
* Profile Updates
* Student Details
* Organizer Details

## 🎫 Event Service

* Event CRUD
* Event Search
* Categories
* Event Management

## 📝 Registration Service

* Event Registration
* Registration Cancellation
* Participant Management

## 🔔 Notification Service

* Event Notifications
* Registration Alerts
* Event Updates

## 🏆 Leaderboard Service

* Rankings
* Student Points
* Achievements

---

# 📊 Project Highlights

* 🚀 **6 Independent Microservices**
* 🌐 **24+ REST APIs**
* 👥 **3 User Roles**
* 🔐 **JWT Authentication**
* 🛡️ **Role-Based Access Control (RBAC)**
* ⚡ **API Gateway Architecture**
* 📦 **MongoDB + Mongoose**
* 📱 **Responsive React Frontend**

---

# 🔄 Authentication Flow

```text
User Login
    │
    ▼
React Frontend
    │
    ▼
API Gateway
    │
    ▼
Authentication Service
    │
    ▼
MongoDB
    │
    ▼
JWT Generated
    │
    ▼
Frontend Stores JWT
    │
    ▼
Authorization: Bearer <token>
```

---

# 🔄 Request Flow

```text
Student Registers for Event
          │
          ▼
   React Frontend
          │
          ▼
     API Gateway
          │
          ▼
 Registration Service
          │
          ▼
 MongoDB Database
          │
          ▼
 Notification Service
          │
          ▼
 Registration Successful
```

---

# 📂 Project Structure

```text
eventure/
│
├── frontend/
│
├── gateway/
│
├── services/
│   ├── auth-service/
│   ├── user-service/
│   ├── event-service/
│   ├── registration-service/
│   ├── notification-service/
│   └── leaderboard-service/
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/eventure.git

cd eventure
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

Install dependencies inside each service.

```bash
cd services/auth-service
npm install

cd ../user-service
npm install

cd ../event-service
npm install

cd ../registration-service
npm install

cd ../notification-service
npm install

cd ../leaderboard-service
npm install

cd ../../gateway
npm install
```

---

# ▶️ Running the Project

Start each backend service.

```bash
npm run dev
```

Start the API Gateway.

```bash
cd gateway
npm run dev
```

Start the frontend.

```bash
cd frontend
npm run dev
```

---

# 🚀 Future Enhancements

* Docker & Docker Compose
* CI/CD with GitHub Actions
* Redis Caching
* Kubernetes Deployment
* AWS Deployment
* Email Notifications
* QR Code Event Check-In
* Payment Gateway Integration
* Calendar Integration
* AI-Based Event Recommendations

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.
