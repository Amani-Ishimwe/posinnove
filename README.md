# Posinnove User Authentication API with JWT

Welcome! This is a simple yet solid authentication system built using **Node.js**, **Express**, **MongoDB**, and **JWT**. It lets users register, log in, and log out securely, with hashed passwords and protected routes.

---

## What’s Included?

- **User registration** with email and password
- **Login** with JWT token generation
- **Logout** functionality
- **Middleware** to protect private routes
- **MongoDB integration** using Mongoose
- **Input validation** with Joi
- **Environment-based config** with `config` package

---

## API Endpoints

| Method | Route          | Purpose                | Protected? |
| ------ | -------------- | ---------------------- | ---------- |
| POST   | `/register`  | Create a new user      |  No       |
| POST   | `/login`     | Authenticate user      | No         |
| POST   | `/logout`    | Clear user token       | Yes        |
| GET    | `/dashboard` | Access private content | Yes        |

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Security:** JWT, bcrypt
- **Validation:** Joi
- **Config Management:** `config`
- **Debugging:** `debug`

---

## Setting Up the Project

1. Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
run "npm run dev or npm run debug "
```
