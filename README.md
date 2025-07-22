# 🚀 SkillUp

A full-stack, peer-to-peer skill-sharing platform built with the MERN stack. SkillUp connects users who want to learn with users who want to teach, featuring profiles, skill listings, and real-time chat.

---

### ✨ Features

-   **User Authentication:** Secure registration and login with JWT.
-   **Public Profiles:** Browse user profiles and skills without an account.
-   **Personalized Dashboard:** A private "My Profile" page for logged-in users.
-   **Real-time Chat:** Connect and chat instantly with other users via Socket.IO.
-   **Responsive UI:** Clean and modern interface built with Chakra UI.

---

### 🛠️ Tech Stack

-   **Frontend:** React, React Router, Chakra UI, Socket.IO Client, Axios
-   **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JWT, bcryptjs

---

### ⚙️ Local Setup & Installation

#### 1. Clone the Repository
```sh
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
cd YOUR_REPOSITORY_NAME
```

#### 2. Backend Setup
```sh
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your variables (see below)

# Start the server
npm start
```
Your backend will run on `http://localhost:5000`.

##### **Backend `.env` File**
Create a `.env` file in the `/backend` folder:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbName?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

#### 3. Frontend Setup
```sh
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the client
npm start
```
Your frontend will open at `http://localhost:3000`.

---

### 👤 Author

-   **[Your Name]** - [GitHub Profile](https://github.com/YOUR_USERNAME)