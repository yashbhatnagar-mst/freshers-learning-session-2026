# Authentication & Profile API Documentation

## Base URL

```txt
http://localhost:3000/api
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Success Response

```json
{
  "statusCode": 201,
  "success": true,
  "message": "User registered successfully",
  "data": null
}
```

---

## Login User

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_access_token"
  }
}
```

### Cookies Set

```json
{
  "refreshToken": "jwt_refresh_token"
}
```

---

## Refresh Access Token

### Endpoint

```http
POST /auth/refresh
```

### Request Body

```json
{}
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

---

## Logout User

### Endpoint

```http
POST /auth/logout
```

### Request Body

```json
{}
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

# Profile APIs

> All profile routes require:

```http
Authorization: Bearer <access_token>
```

---

## Create Profile

### Endpoint

```http
POST /profile
```

### Request Body

```json
{
  "name": "John Doe",
  "bio": "Full Stack Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Success Response

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "_id": "profile_id",
    "user": "user_id",
    "name": "John Doe",
    "bio": "Full Stack Developer",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T10:00:00.000Z"
  }
}
```

---

## Get Profile

### Endpoint

```http
GET /profile
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "profile_id",
    "user": {
      "_id": "user_id",
      "email": "john@example.com"
    },
    "name": "John Doe",
    "bio": "Full Stack Developer",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T10:00:00.000Z"
  }
}
```

---

## Update Profile

### Endpoint

```http
PATCH /profile
```

### Request Body

```json
{
  "name": "John Doe Updated",
  "bio": "Backend Developer",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "profile_id",
    "user": {
      "_id": "user_id",
      "email": "john@example.com"
    },
    "name": "John Doe Updated",
    "bio": "Backend Developer",
    "avatar": "https://example.com/new-avatar.jpg",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T12:00:00.000Z"
  }
}
```

---

## Delete Profile

### Endpoint

```http
DELETE /profile
```

### Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Profile deleted successfully",
  "data": null
}
```

---

# Common Error Responses

## Validation Error

```json
{
  "statusCode": 400,
  "success": false,
  "message": "All fields are required"
}
```

## Invalid Credentials

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Invalid email or password"
}
```

## Unauthorized

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized"
}
```

## Forbidden

```json
{
  "statusCode": 403,
  "success": false,
  "message": "Access denied"
}
```

## Not Found

```json
{
  "statusCode": 404,
  "success": false,
  "message": "Profile not found"
}
```

## Conflict

```json
{
  "statusCode": 409,
  "success": false,
  "message": "User already exists"
}
```

## Refresh Token Missing

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Refresh token not found"
}
```

## Invalid Refresh Token

```json
{
  "statusCode": 401,
  "success": false,
  "message": "Invalid refresh token"
}
```

## Internal Server Error

```json
{
  "statusCode": 500,
  "success": false,
  "message": "Internal Server Error"
}
```

---

# Headers

## Protected Routes

```json
{
  "Authorization": "Bearer <access_token>"
}
```

## Content Type

```json
{
  "Content-Type": "application/json"
}
```

---

# Response Structure

## Success Response

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error Response

```json
{
  "statusCode": 400,
  "success": false,
  "message": "Something went wrong"
}
```

---

# API Summary

| Method | Endpoint       | Authentication |
| -------- | ---------------- | ---------------- |
| POST     | /auth/register   | ❌ No |
| POST     | /auth/login      | ❌ No |
| POST     | /auth/refresh    | ❌ No |
| POST     | /auth/logout     | ❌ No |
| POST     | /profile         | ✅ Yes |
| GET      | /profile         | ✅ Yes |
| PATCH    | /profile         | ✅ Yes |
| DELETE   | /profile         | ✅ Yes |

---

# Utility Functions

## Success Response Helper

```js
const apiResponse = (
  statusCode,
  message,
  data = null
) => {
  return {
    statusCode,
    success: statusCode < 400,
    message,
    data,
  };
};

export default apiResponse;
```

## Error Response Helper

```js
const apiError = (
  statusCode = 500,
  message = "Internal Server Error"
) => {
  return {
    statusCode,
    success: false,
    message,
  };
};

export default apiError;
```

---

# Example Controller Usage

## Success

```js
return res.status(200).json(
  apiResponse(
    200,
    "Profile fetched successfully",
    profile
  )
);
```

## Error

```js
return res.status(404).json(
  apiError(
    404,
    "Profile not found"
  )
);
```