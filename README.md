# Gym Management System

This project is a full-stack **Gym Management System** built with the **MERN stack (MongoDB, Express, React, Node.js)**. The system allows gym owners to manage their gym members, classes, and pricing, while also providing an interface for regular users.

## Project Structure


---

## Backend

### Description

The backend of the Gym Management System is built with **Node.js**, **Express**, and **MongoDB**. It handles all the CRUD operations for members, gym classes, and pricing, providing API endpoints for the frontend.

### Database Setup

- **Cluster**: The backend connects to a MongoDB Atlas free cluster named `gymManagement`.
- **Database**: Inside the cluster, the database is named `gym_management`.

### Collections

- **classes**: Stores information about gym classes, including title, instructor name, schedule, timings, description, and associated image.
- **members**: Stores details such as userId, username, membership type, start date, end date, payment mode, workout level, and government ID proof.
- **Future collections**:
  - **pricing**: This collection will be used to manage pricing details, including membership plans, offers, and other promotions.
  - **users**: This collection will handle user data for login and signup, enabling secure authentication in future versions.


### Features

- **Member management** (add/remove members)
- **Class management** (add/edit/remove gym classes)
- **Pricing management** (manage membership prices and offers)
- **Authentication**: Currently, the gym owner logs in using a hardcoded `userId` (`1`) and password (`okinsuk`). This is intended for trial purposes only. In future iterations, this will be replaced with a secure authentication system, and by default, normal users will log in using their credentials.

### Hardcoded Login for Gym Owner

For development and testing purposes, the gym owner login uses the following credentials:

- **userId**: `1`
- **Password**: `okinsuk`

In the future, this will be replaced with a more secure JWT-based authentication system. Regular users will log in with their own credentials.


### Installation & Setup

1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables (MongoDB connection, JWT secret, etc.) in a `.env` file:
    ```bash
    MONGODB_URI=your-mongodb-uri
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

By default, the backend server runs on `http://localhost:5000`.

---

## Frontend

### Description

The frontend is built using **React** and **Bootstrap** for the Gym Management System's user interface. It provides an intuitive dashboard for gym owners to manage classes, pricing, and members, and for regular users to view class schedules and gym offerings.

### Features

- Responsive design with Bootstrap
- Gym owner-specific features (add/remove classes, manage members)
- User-specific features (view class schedules, membership pricing)
- Dynamic and conditional rendering for role-based UI

### Installation & Setup

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

By default, the frontend runs on `http://localhost:3000`.

---

## Project Workflow

- The **frontend** interacts with the **backend** through API calls for managing gym operations.
- The **backend** connects to a **MongoDB** database for data storage and retrieval.

---

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **Authentication**: JWT-based system

---

## Running the Full Application

To run the entire Gym Management System, follow these steps:

1. **Run the Backend**: 
   Navigate to the `backend` directory and start the backend server:
   ```bash
   cd backend
   npm start

2. **Run the Frontend**: 
   Open a new terminal window and navigate to the `frontend` directory to start the React frontend:
   ```bash
   cd frontend
   npm start


---
**Note**: In future updates, the login system will implement secure authentication methods for both gym owners and regular users.


This section provides clear, step-by-step instructions to run both the `backend` and `frontend` of your Gym Management System.

