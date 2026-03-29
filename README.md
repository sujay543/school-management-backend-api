# 📚 School Management API

A RESTful API built using Node.js, Express, and MySQL to manage school data and fetch schools based on proximity to a given location.

---

## 🚀 Features

* ➕ Add a new school
* 📍 Get all schools
* 📏 Get schools sorted by distance from a user’s location
* ✅ Input validation for data integrity
* 🌐 Deployed on cloud (Render)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Postman (API testing)
* Render (Deployment)

---

## 📦 API Endpoints

### 1. Add School

**POST** `/api/v1/schools/addSchool`

**Request Body:**

```json
{
  "name": "ABC School",
  "address": "Siliguri",
  "latitude": 26.72,
  "longitude": 88.42
}
```

**Response:**

```json
{
  "status": "success",
  "message": "school has been added"
}
```

---

### 2. Get All Schools

**GET** `/api/v1/schools`

**Response:**

```json
{
  "status": "success",
  "data": [ ... ]
}
```

---

### 3. Get Nearby Schools

**GET** `/api/v1/schools/listSchools?latitude=26.42&longitude=88.70`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "name": "ABC School",
      "distance": 0.5
    }
  ]
}
```

---

## 📏 Distance Calculation

Distance between user location and schools is calculated using geographical coordinates (latitude & longitude) and results are sorted in ascending order (nearest first).

---

## 🌐 Live API

Base URL:

```
https://school-management-backend-api-orbl.onrender.com
```

---

## 🧪 Postman Collection

Import the provided Postman collection JSON file to test all APIs easily.

---

## 📁 Project Structure

```
├── controllers/
├── routes/
├── models/
├── config/
├── utils/
├── server.js
└── postman_collection.json
```

---

## ⚠️ Validation

* All fields are required
* Latitude and Longitude must be valid numbers

---

## 📌 Future Improvements

* Add authentication (JWT)
* Pagination for large data
* Geo-indexing for performance optimization

---

## 👨‍💻 Author

Sujay Sen
