# 🚀 TaskForge - Team Task Manager (Full Stack)

TaskForge is a full-stack web application designed to manage projects, assign tasks to team members, and track work progress with secure role-based access control.

This application was built as an AI Assessment project to demonstrate:

- Full Stack Development
- REST API Integration
- MongoDB Relationships
- JWT Authentication
- Role-Based Authorization
- CRUD Operations

---

# 📌 Features

## 🔐 Authentication
- User Signup
- User Login
- JWT Token Based Session Handling
- Password Hashing using bcryptjs

## 👥 Role Based Access Control
### Admin
- Create Projects
- View All Projects
- Create Tasks
- Assign Tasks to Members
- Monitor All Tasks
- Dashboard Analytics

### Member
- View Assigned Tasks Only
- Update Task Status
- Track Due Dates
- Overdue Task Detection

---

# 📊 Dashboard Analytics
- Total Projects Count
- Total Tasks Count
- Completed Tasks Count
- Overall Progress Percentage

---

# 🛠 Tech Stack

## Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose ODM

## Security
- JWT Authentication
- bcryptjs Password Encryption

---

# 🗂 Folder Structure

TaskForge/<br>
│<br>
├── backend/<br>
│ ├── config/<br>
│ ├── controllers/<br>
│ ├── middleware/<br>
│ ├── models/<br>
│ ├── routes/<br>
│ ├── utils/<br>
│ └── server.js<br>
│<br>
├── frontend/<br>
│ ├── src/<br>
│ │ ├── api/<br>
│ │ ├── components/<br>
│ │ ├── context/<br>
│ │ ├── pages/<br>
│ │ └── App.jsx<br>
│<br>
└── README.md<br>

---

# ⚙️ Installation & Setup

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/TaskForge-Team-Task-Manager.git
cd TaskForge-Team-Task-Manager

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:5173

---

# 🔄 REST API Modules

## Auth Routes

* POST /api/auth/signup
* POST /api/auth/login
* GET /api/auth/users

## Project Routes

* POST /api/projects/create
* GET /api/projects/all

## Task Routes

* POST /api/tasks/create
* GET /api/tasks/all
* GET /api/tasks/mytasks
* PUT /api/tasks/status/:id

---

# 🔗 Database Relationships

* One Admin can create multiple Projects
* One Project can have multiple Tasks
* One Member can be assigned multiple Tasks

Relationships handled using MongoDB ObjectId references with Mongoose populate().

---

# ✨ Key Highlights

* Clean role separation between Admin and Member
* Protected frontend routes
* Protected backend middleware
* Dynamic dashboard statistics
* Overdue task identification
* Modern responsive UI

---

# 👨‍💻 Author

Mohd Adil Ansari
