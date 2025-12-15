
## 📩 Real-Time Messaging & Collaboration Platform

A full-stack, real-time messaging application built to enable fast, secure, and reliable communication between team members in operational environments.

You can find the deployed project at [https://messaging-app-7bf0.onrender.com]

#### Note

     The application is still under development and not yet fully complete.

🚀 Live Demo

🔗 Frontend: [Add S3 / [CloudFront URL](https://message-app-ukya.onrender.com)]

🔗 Backend API: [Add EC2 / [API URL](https://hashtagserver.onrender.com)]


## 📌 Project Purpose

Designed and built a real-time messaging platform to enable fast, reliable communication between team members in operational environments. The application improves coordination, reduces delays caused by manual communication, and provides a secure, centralized system for real-time collaboration.

The application supports instant message delivery, user authentication, and scalable cloud deployment.


## 🛠 Tech Stack

#### Frontend

     - React.js
     
     - Redux Toolkit
     
     - React Hook Form
     
     - Tailwind CSS

#### Backend

     - Node.js
     
     - Express.js
     
     - Socket.IO (Real-Time Communication)

#### Database

     - PostgreSQL

#### Cloud & Deployment

     - AWS EC2 (Backend)
     
     - AWS RDS (PostgreSQL)
     
     - AWS S3 (Frontend Hosting)


## ✨ Features

     🔐 User authentication with JWT
     
     💬 Real-time messaging using Socket.IO
     
     👥 One-to-one and group conversations
     
     🟢 Online/offline user status
     
     ✍️ Typing indicators
     
     📁 Persistent message storage
     
     🧾 Form validation with React Hook Form
     
     📱 Responsive UI with Tailwind CSS
     
     ☁️ Cloud deployment on AWS

## 🧱 System Architecture

     React (Frontend)
        |
        | REST API / WebSocket
        |
          Node.js + Express (Backend)
        |
          PostgreSQL (Database)
        |
          AWS (EC2, RDS, S3)


### 🔗 API Overview

#### Authentication

- POST /api/auth/register – Register new user

- POST /api/auth/login – Login user

#### Messaging

- GET /api/conversations – Get user conversations

- GET /api/messages/:conversationId – Fetch messages

- POST /api/messages – Send message (REST fallback)

#### Socket.IO Events

- connection – User connects

- sendMessage – Send real-time message

- receiveMessage – Receive real-time message

- typing – Typing indicator

- disconnect – User disconnects


## 🗄 Database Schema (Simplified)

#### users

- id, name, email, password, role

#### conversations

- id, isGroup, createdAt

#### messages

- id, senderId, conversationId, content, timestamp
- 

### 👤 Author

Ruwaidah Alfakhri
Full Stack Developer
🔗 LinkedIn: [Your LinkedIn]


## For Testing

#### User 1

- Username: Username1
- Password: 12345678

#### User 2

- Username: Username2
- Password: 12345678

#### User 3

- Username: Username3
- Password: 12345678

#### [Back end]https://github.com/Ruwaidah/hashtagserver
