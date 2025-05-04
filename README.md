# 📝 Referral Tracker System

A full-stack web application that allows users to register, login, and manage referred candidates for jobs. Includes resume uploads, status tracking, and a dashboard for basic metrics.

---

## 🚀 Features Implemented

### ✅ Authentication
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes with middleware

### ✅ Candidate Management
- Add candidate details along with PDF resume
- List all candidates
- Update candidate status (`Pending`, `Reviewed`, `Hired`)
- Delete candidate

### ✅ Resume Upload
- Upload and serve candidate resumes (PDF only)
- Uses `multer` for file handling

### ✅ Dashboard Metrics
- View total number of referrals
- Breakdown of referrals by status (Pending, Reviewed, Hired)

---

## 🛠️ Tech Stack

- **Frontend**: React.js (user interface)
- **Backend**: Node.js, Express.js (REST API)
- **Database**: MongoDB Atlas
- **Auth**: JSON Web Tokens (JWT)
- **File Upload**: Multer
- **Storage**: Local `uploads/` directory for resumes

---

## 🧪 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/referral-tracker.git
cd referral-tracker
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://ktchandru1234:k.t.chandru1234@cluster0.afircsf.mongodb.net/mern
JWT_SECRET=sample_secret_key_for_demo_purposes
```

> ⚠️ Replace values with your own secrets in production.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Backend Server

```bash
node index.js
```

It should show:

```
MongoDB connected  
Server running on port 5000
```

---

### 5. Run the Frontend (if not already running)

```bash
cd client
npm install
npm start
```

The frontend should be available at: `http://localhost:3000`  
The backend runs at: `http://localhost:5000`

---

## 🔁 API Endpoints Summary

| Method | Endpoint                        | Description                   | Protected |
|--------|----------------------------------|-------------------------------|-----------|
| POST   | `/auth/register`               | Register a new user           | ❌        |
| POST   | `/auth/login`                  | Login and get token           | ❌        |
| POST   | `/candidates`                  | Add a candidate (with file)   | ✅        |
| GET    | `/candidates`                  | Get all candidates            | ✅        |
| PUT    | `/candidates/:id/status`       | Update candidate status       | ✅        |
| DELETE | `/candidates/:id`              | Delete a candidate            | ✅        |
| GET    | `/candidates/metrics/stats`    | View dashboard metrics        | ✅        |

> Add `Authorization: Bearer <token>` header to all protected routes.

---

## 📌 Assumptions & Limitations

- Only PDF resumes are allowed for upload.
- Resume files are stored on the local server (not a cloud service).
- No email notifications or third-party integrations yet.
- No admin/user role distinction — all logged-in users can manage candidates.

---

## 🙌 Author

Made with ❤️ by Chandru KT  
🎓 MSc Software Systems, CIT  
🔗 [LinkedIn](https://www.linkedin.com/in/chandru-kt) | 🧠 Backend | Cloud | DevOps

---

## 📄 License

This project is licensed under the MIT License.
