Here’s a more concise **README.md** for your project:

---

# Car Wash Booking System

## Overview

A backend system for managing a car wash business. Features include user authentication, service booking, and slot management. Built using **TypeScript**, **Express.js**, **MongoDB**, and **Mongoose**.

---

## Features

- **User Authentication**: JWT-based login, roles (admin/user).
- **Service Management**: CRUD operations for car wash services.
- **Slot Management**: Manage time slots for bookings.
- **Booking System**: Book car wash services by vehicle type and time slot.
- **Error Handling**: Custom error messages and middleware.

---

## Tech Stack

- **Node.js**, **Express.js**
- **TypeScript**
- **MongoDB**, **Mongoose**
- **JWT**, **BCrypt**

---

## Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/AsibHasanRiyad/car-wash-system.git
   cd car-wash-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file with the following:

   ```plaintext
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/car-wash-db
   BCRYPT_SALT_ROUNDS=10
   JWT_REFRESH_SECRET=your_refresh_secret_key
   JWT_ACCESS_EXPIRES_IN=12h
   JWT_REFRESH_EXPIRES_IN=30d
   ```

4. **Run MongoDB**:
   Make sure MongoDB is running locally or via a cloud instance:

   ```bash
   mongod
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication

- **Register**: `POST /api/v1/auth/register`
- **Login**: `POST /api/v1/auth/login`

### Services

- **List Services**: `GET /api/v1/services`
- **Create Service** (Admin): `POST /api/v1/services`

### Slots

- **List Slots**: `GET /api/v1/slots`
- **Create Slot** (Admin): `POST /api/v1/slots`

### Bookings

- **Create Booking**: `POST /api/v1/bookings`
- **Get User Bookings**: `GET /api/v1/bookings/user`

---

## Running Scripts

- **Development**: `npm run dev`
- **Production**: `npm start`
- **Linting**: `npm run lint`

---
