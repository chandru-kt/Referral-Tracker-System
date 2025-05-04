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
![image](https://github.com/user-attachments/assets/b8edfd03-10b9-4f5d-8a6e-03f01ea2b56a)
![image](https://github.com/user-attachments/assets/9f140912-34ea-4c17-ac54-11d75df09862)
![image](https://github.com/user-attachments/assets/72e40af1-5bd1-4421-8ae1-eac3bdb04e6c)
![image](https://github.com/user-attachments/assets/d7adb376-9b66-410b-b337-68bc55ed6091)
![image](https://github.com/user-attachments/assets/ab9c52f9-19c2-49c7-b5e8-fce4091e1ced)
![image](https://github.com/user-attachments/assets/f1ce883c-a424-4c06-b59c-bed2fc30a4d1)

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
git clone https://github.com/chandru-kt/referral-tracker.git
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.afircsf.mongodb.net/mern
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
![image](https://github.com/user-attachments/assets/a515f444-41ed-4402-918f-979ae1a8ac40)
![image](https://github.com/user-attachments/assets/03372437-538a-4da3-97a0-18d8fc154f19)
![image](https://github.com/user-attachments/assets/92957882-e4bc-447f-b203-7447ccfc811b)
![image](https://github.com/user-attachments/assets/32bca296-5e74-4057-a78d-a9bbda0d5092)
![image](https://github.com/user-attachments/assets/e2374066-2483-44b9-8219-4eb6eaa1aad1)
![image](https://github.com/user-attachments/assets/7769544e-d66b-4e0d-84fe-0248acaa0a81)

---
## 📌 Assumptions & Limitations

- Resume files are stored on the MongoDB Atlas.
- No email notifications or third-party integrations yet.

---

## 🙌 Author

Made with ❤️ by Chandru KT  
🎓 MSc Software Systems, CIT  
🔗 [LinkedIn](https://www.linkedin.com/in/chandru-kt) | 🧠 Backend | Cloud | DevOps

---

## 📄 License

This project is licensed under the MIT License.
