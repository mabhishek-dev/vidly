# Vidly API Documentation

This document describes the **REST API endpoints** available in the Vidly backend service.

The API allows applications to manage **users, authentication, genres, customers, movies, and rentals** for a video rental system.

---

# Base URL

## Production (Render)

```
https://vidly-8skn.onrender.com/api
```

This URL can be used if you want to **test the API using tools such as Postman** or integrate it directly into your own applications.

Example:

```
https://vidly-8skn.onrender.com/api/movies
```

---

## Local Development

```
http://localhost:<PORT>/api
```

Example:

```
http://localhost:3000/api/movies
```

If running the project locally, ensure that the required **environment variables are configured**.

Refer to **[README.md](./README.md)** for environment setup instructions.

---

# Authentication

Some endpoints require authentication using **JSON Web Tokens (JWT)**.

A JWT token can be obtained in **two ways**:

### 1. User Registration

When a user registers using the `/api/users` endpoint, a JWT token is returned in the **response header**.

### 2. User Login

When a registered user logs in using the `/api/auth` endpoint, a JWT token is returned in the **response body**.

Refer to the **Users** and **Authentication** endpoints below for details.

---

## Using the JWT Token

For endpoints that require authentication, the JWT must be included in the request header.

Header format:

```
`x-auth-token`: <JWT_TOKEN>
```

Example:

```
`x-auth-token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

> ⚠️ **Important**
>
> Refer to the **Authentication section above** before using protected endpoints.
>
> Whenever an endpoint says **"Requires authentication"**, the request must include the following header:
>
> ```
> `x-auth-token`: <JWT_TOKEN>
> ```
>
> - The **header key must be** `x-auth-token`
> - The **value must be the JWT token** obtained from **user registration** or **user login**
>
> If this header is **missing**, the request will be rejected.
>
> Example error:
>
> ```
> 401 Access denied. No token provided.
> ```

---

## Authorization Rules

| Operation                  | Requirement                                   |
| -------------------------- | --------------------------------------------- |
| Read genres or movies      | Public endpoint (authentication not required) |
| Create or update resources | Authenticated user                            |
| Delete resources           | Admin user                                    |

Admin privileges are determined from the **JWT payload**:

```
{
  "_id": "...",
  "isAdmin": true
}
```

---

# Endpoints

---

# [Users]()

---

## Register User

```
POST /api/users
```

Creates a new user account.

A JWT token is returned in the **response header** after successful registration.

### Request Body

```json
{
  "name": "Sample User",
  "email": "user@email.com",
  "password": "password"
}
```

### Response

```json
{
  "_id": "userId",
  "name": "Sample User",
  "email": "user@email.com"
}
```

JWT token header:

```
x-auth-token
```

---

## Get Current User

```
GET /api/users/me
```

Requires authentication.

Returns the currently authenticated user's profile.

---

# [Authentication]()

---

## Login

```
POST /api/auth
```

Authenticates a registered user and returns a **JWT token**.

### Request Body

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

### Response

```
JWT_TOKEN
```

This token must be used in the request header:

```
`x-auth-token`: <JWT_TOKEN>
```

---

# [Genres]()

---

## Get All Genres

```
GET /api/genres
```

Public endpoint.

This endpoint can be accessed **without authentication**.

Returns all genres sorted by name.

---

## Get Genre

```
GET /api/genres/:id
```

Public endpoint.

Returns a specific genre.

---

## Create Genre

```
POST /api/genres
```

Requires authentication.

### Request Body

```json
{
  "name": "Action"
}
```

---

## Update Genre

```
PUT /api/genres/:id
```

Requires authentication.

### Request Body

```json
{
  "name": "Action"
}
```

---

## Delete Genre

```
DELETE /api/genres/:id
```

Requires:

- Authentication
- Admin privileges

---

# [Customers]()

---

All customer endpoints **require authentication**.

---

## Get Customers

```
GET /api/customers
```

Returns all customers sorted by name.

---

## Get Customer

```
GET /api/customers/:id
```

Returns a specific customer.

---

## Create Customer

```
POST /api/customers
```

### Request Body

```json
{
  "name": "Sample Customer",
  "phone": "123456789",
  "isGold": true
}
```

---

## Update Customer

```
PUT /api/customers/:id
```

### Request Body

```json
{
  "name": "Sample Customer",
  "phone": "123456789",
  "isGold": false
}
```

---

## Delete Customer

```
DELETE /api/customers/:id
```

Requires:

- Authentication
- Admin privileges

---

# [Movies]()

---

## Get Movies

```
GET /api/movies
```

Public endpoint.

Returns all movies sorted by title.

---

## Get Movie

```
GET /api/movies/:id
```

Public endpoint.

Returns a specific movie.

---

## Create Movie

```
POST /api/movies
```

Requires authentication.

### Request Body

```json
{
  "title": "Sample Movie",
  "genreId": "genreObjectId",
  "numberInStock": 10,
  "dailyRentalRate": 2
}
```

The genre must already exist.

---

## Update Movie

```
PUT /api/movies/:id
```

Requires authentication.

### Request Body

```json
{
  "title": "Sample Movie",
  "genreId": "genreObjectId",
  "numberInStock": 5,
  "dailyRentalRate": 2
}
```

---

## Delete Movie

```
DELETE /api/movies/:id
```

Requires:

- Authentication
- Admin privileges

---

# [Rentals]()

---

All rental endpoints **require authentication**.

---

## Get Rentals

```
GET /api/rentals
```

Returns rentals sorted by **dateOut descending**.

---

## Get Rental

```
GET /api/rentals/:id
```

Returns a specific rental.

---

## Create Rental

```
POST /api/rentals
```

Creates a new rental and decreases the movie stock.

### Request Body

```json
{
  "customerId": "customerObjectId",
  "movieId": "movieObjectId"
}
```

Validation rules:

- Customer must exist
- Movie must exist
- Movie must be in stock

---

## Return Rental

```
POST /api/rentals/:id/return
```

Processes a movie return.

Behavior:

- Sets `dateReturned`
- Calculates rental fee
- Increases movie stock

Rental fee calculation:

```
rentalDays = ceil((currentDate - dateOut) / 1 day)
rentalFee = rentalDays × dailyRentalRate
```

---

# Error Responses

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| 400         | Bad Request – Invalid input or validation error          |
| 401         | Unauthorized – Authentication token missing              |
| 403         | Forbidden – User does not have required permissions      |
| 404         | Not Found – Requested resource does not exist            |
| 500         | Internal Server Error – Unexpected server error occurred |

Example error message:

```
Invalid email or password.
```

---

# Notes

- Authentication uses **JSON Web Tokens (JWT)**.
- Protected routes require the **`x-auth-token` header**.
- JWT tokens can be obtained during **user registration** or **user login**.
- Public endpoints can be accessed **without authentication**.
- Deleting resources requires **admin privileges**.

---

# Admin Access

Admin operations require a JWT token with the `isAdmin` flag set to `true`.

This flag is **assigned manually in the database** and cannot be set through the public API.

For admin access requests, contact me on **[LinkedIn](https://www.linkedin.com/in/mabhishek-dev/)**

---

# Usage

This API can be consumed by:

- Frontend applications
- Backend services
- API testing tools such as **Postman**
