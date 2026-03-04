# Vidly API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-007ACC?style=for-the-badge)
![Winston](https://img.shields.io/badge/Winston-231F20?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

A **RESTful backend API** for a video rental application built using **Node.js, Express, and MongoDB**.

This project was built as a backend service to practice designing and implementing **secure REST APIs** using Node.js and MongoDB with proper validation, authentication, and logging.

Application data is stored in **MongoDB Atlas** and accessed through **Mongoose**.

The API is intended to be consumed by client applications or tested using tools such as **Postman**.

---

## Live API

The API is deployed on **Render**:

https://vidly-8skn.onrender.com/api/

This endpoint is intended to be accessed through tools like **Postman** or integrated directly into applications that consume the API.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- **MongoDB Atlas (Cloud Database)**
- Mongoose
- JSON Web Tokens (JWT)
- **bcrypt (Password Hashing)**
- Joi Validation
- Winston Logging
- Postman (API Testing)

---

## Features

- RESTful API architecture  
- JWT-based authentication and authorization  
- Role-based access control for admin operations  
- CRUD operations for:
  - Movies
  - Genres
  - Customers
  - Rentals
  - Users
- Password hashing using **bcrypt**
- Request validation using **Joi**
- Centralized error handling middleware
- Logging using **Winston**

---

## Project Structure

```
vidly/
│
├── README.md      ← project overview
├── API.md         ← API endpoint documentation
│
├── config/
├── middleware/
├── models/
├── routes/
├── startup/
│
├── index.js
└── package.json
```

---

## Documentation

For complete API endpoint documentation and usage examples, see:

**API Endpoints → [API.md](./API.md)**

---

## Environment Variables

The application requires the following environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_PRIVATE_KEY=your_jwt_secret_key
PORT=3000
```

These variables can be configured in **two ways**:

1. By creating a **`.env` file** in the project root.
2. By setting them as **environment variables in the terminal**.

Refer to the **[Setting Environment Variables](#setting-environment-variables)** section below for platform-specific commands.

---

### MongoDB Connection

The application reads the MongoDB connection string using:

```
process.env.MONGO_URI
```

This value is used in the database configuration (`startup/db.js`) and logging configuration (`startup/logging.js`).

You can connect using either:

**MongoDB Atlas**

If you are using MongoDB Atlas, assign your Atlas connection string to `MONGO_URI`.

Example in `.env`:

```
MONGO_URI=your_atlas_connection_string
```

or set it using environment variables as shown in the **[Setting Environment Variables](#setting-environment-variables)** section below.

---

**Local MongoDB**

If MongoDB is installed locally and running on port **27017**, the connection string will be:

```
mongodb://localhost:27017/vidly
```

You should assign this value to the `MONGO_URI` variable.

Example in `.env`:

```
MONGO_URI=mongodb://localhost:27017/vidly
```

Alternatively, set it using environment variables as shown in the **[Setting Environment Variables](#setting-environment-variables)** section below.

---

## Setting Environment Variables

### macOS / Linux

```
export JWT_PRIVATE_KEY=your_secret_key
export MONGO_URI=mongodb://localhost:27017/vidly
export PORT=3000
```

### Windows (Command Prompt)

```
set JWT_PRIVATE_KEY=your_secret_key
set MONGO_URI=mongodb://localhost:27017/vidly
set PORT=3000
```

The port is **not restricted to 3000**.  
You can assign any available port number.

---

## Running the Project Locally

### 1. Clone the repository

```
git clone https://github.com/mabhishek-dev/vidly.git
cd vidly
```

### 2. Install dependencies

```
npm install
```

### 3. Start MongoDB

You can run MongoDB:

- Locally (for example using **Homebrew** on macOS)
- Or use **MongoDB Atlas**

### 4. Start the server

Run using Node:

```
node index.js
```

### Development with auto reload

If **nodemon is installed globally**

```
nodemon index.js
```

If **nodemon is not installed globally**

```
npx nodemon index.js
```

---

## Authentication

Most API endpoints require authentication.

Users must first **register or login** to obtain a **JSON Web Token (JWT)**.

The token must be included in the request header:

```
x-auth-token: <JWT_TOKEN>
```

Permissions:

- Unauthenticated users can only retrieve limited data.
- Registered users can perform operations such as creating or updating resources.
- Certain actions (such as deleting resources) require **admin privileges**.

For detailed authentication flow and endpoint usage, refer to:

**API Documentation → [API.md](./API.md)**

---

## Testing the API

The API can be tested using **Postman**.

For detailed endpoint information and request examples, refer to:

**API Documentation → [API.md](./API.md)**

---

## License

This project is licensed under the **MIT License**.
