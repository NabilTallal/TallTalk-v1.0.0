# TallTalk – A Modern Real-Time Chat Application

## 📋 Overview

TallTalk is a real-time one-to-one chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO**. It provides users with a smooth, secure, and responsive messaging experience, featuring secure authentication, real-time message delivery, online/offline status indicators, emoji support, and image sharing.

The application was developed as a **bachelor's thesis** at the University of Debrecen, Faculty of Informatics, with a focus on understanding modern full-stack web development practices and implementing security best practices throughout the architecture.

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | JWT-based authentication with HTTP-only cookies |
| 💬 Real-Time Messaging | Instant message delivery via Socket.IO |
| 👤 User Profiles | Profile pictures stored securely via Cloudinary |
| 🟢 Online Status | Real-time online/offline user indicators |
| 🖼️ Image Sharing | Send and receive images in conversations |
| 📜 Chat History | Persistent message storage with MongoDB |
| 📧 Welcome Emails | Automated welcome emails via Resend |
| 📱 Responsive UI | Modern interface built with React and Tailwind CSS |

### 🔒 Security Features (TallSec)

- JWT authentication with HTTP-only cookies
- `bcrypt` password hashing
- Route protection middleware
- WebSocket authentication
- Rate limiting — 100 requests per IP per minute
- Helmet security headers (CSP, XSS protection)
- Bot detection mechanisms
- Input validation and sanitization
- Secure Cloudinary integration

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, Zustand, Axios, Tailwind CSS, DaisyUI, react-hot-toast |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JWT, bcrypt |
| **Security** | Helmet, custom rate limiting, bot detection |
| **Deployment** | Render (or any Node.js hosting) |

---

## 📁 Project Structure
```text
TallTalk/
├── frontend/                 # React client application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── stores/           # Zustand state stores
│   │   ├── services/         # API services (Axios)
│   │   └── utils/            # Helper functions
│   └── package.json
├── backend/                  # Node.js server application
│   ├── controllers/          # Request handlers
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── middleware/           # Auth, security middleware
│   ├── utils/                # Helper functions (JWT, Cloudinary)
│   ├── email/                # Email templates & sending
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js `v18+`
- MongoDB (local or Atlas)
- Cloudinary account *(for image uploads)*
- Resend account *(for welcome emails)*

---

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/talltalk.git
cd talltalk
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🔧 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate an existing user |
| `POST` | `/logout` | Logout and clear JWT cookie |
| `PUT` | `/profile-update` | Update profile picture |
| `GET` | `/check` | Verify current user session |

### Messages — `/api/messages`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/contacts` | Get all users except logged-in user |
| `GET` | `/chats` | Get users with prior conversations |
| `GET` | `/users/:userId/messages` | Get message history with a user |
| `POST` | `/users/send/:userId/messages` | Send a new message |
| `PUT` | `/:messageId/deleteForAll` | Delete a message for everyone |

---

## 🧪 Testing

### Backend Testing (Postman)

All API endpoints were tested using **Postman**, covering:

- User registration and login
- Protected route access
- Message sending and retrieval
- Rate limiting (`429` responses)
- JWT tampering detection
- Security headers verification

### Frontend Testing

- Unit tests for Zustand stores
- Integration tests for message flow
- Manual UI testing across multiple browser sessions

---

## 🔒 Security Architecture (TallSec)

TallSec is a custom **multi-layered security architecture** implemented in TallTalk:

| Layer | Protection |
|---|---|
| **Authentication** | JWT + HTTP-only cookies |
| **Data Security** | `bcrypt` password hashing |
| **API Protection** | Route protection middleware |
| **Real-time Protection** | WebSocket authentication |
| **Abuse Prevention** | Rate limiting (100 req/min) |
| **Client Protection** | Helmet security headers |
| **Bot Mitigation** | User-agent filtering |
| **Input Validation** | Field and format validation |

---

## 🚧 Future Improvements

- [ ] End-to-end encryption for messages
- [ ] Video and audio sharing
- [ ] Typing indicators
- [ ] Group chat functionality
- [ ] Performance optimization (caching, database indexing)
- [ ] CI/CD pipeline integration
- [ ] Mobile application

---

## 👨‍💻 Author

**Nabil Tallal**  
Computer Science BSc  
University of Debrecen

---

## 🙏 Acknowledgements

- **Dr. Adamkó Attila Tamás** : Thesis supervisor
- University of Debrecen, Faculty of Informatics
- Open source community for the amazing tools and libraries

---

## 📄 License

This project was developed as an academic thesis. For questions or permissions, please contact the author.

---

> *TallTalk – Modern, Secure, Real-Time Communication*
