# Connect 
## 📩 Real-Time Messaging & Collaboration Platform

A full-stack, real-time messaging application built to enable fast, secure, and reliable communication between team members in operational environments.


#### Note

     The application is still under development and not yet fully complete.

## 🚀 Live Demo

🔗 [Connect](https://message-app-ukya.onrender.com)


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

     - Render (Backend)
     
     - AWS RDS (PostgreSQL)
     
     - Render (Frontend Hosting)


## ✨ Features

     🔐 User authentication with JWT
     
     💬 Real-time messaging using Socket.IO
     
     👥 One-to-one and user conversations
     
     🟢 Online/offline user status * InProgress
     
     ✍️ Typing indicators * InProgress
     
     📁 Persistent message storage
     
     🧾 Form validation with React Hook Form
     
     📱 Responsive UI with CSS
     
## 🧱 System Architecture

     React (Frontend)
        |
        | REST API / WebSocket
        |
     Node.js + Express (Backend)
        |
     PostgreSQL (Database)
        |
     AWS (EC2, RDS)


### 🔗 API Overview

#### Authentication

- POST /api/users/register – Register new user

- POST /api/users/login – Login user

#### Messaging

- GET /api/listmessages – Get user conversations

#### Socket.IO Events

- connection – User connects

- sendMessage – Send real-time message

- receiveMessage – Receive real-time message

- typing – Typing indicator  * InPro 

- disconnect – User disconnects


## 🗄 Database Schema

#### users

- id, name, email, password

#### messages

- id, senderId, conversationId, content, timestamp

### 👤 Author

Ruwaidah Alfakhri

Full Stack Developer


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

