# Gym Management System

This project is a full-stack **Gym Management System** built with the **MERN stack (MongoDB, Express, React, Node.js)**. The system allows gym owners to manage their gym members, classes, and pricing, while also providing an interface for regular users.

---

## Project Structure

- **Backend**: Built with **Node.js**, **Express**, and **MongoDB**, handling all CRUD operations for members, gym classes, and pricing.
- **Frontend**: Developed using **React** and **Bootstrap** to create a responsive, intuitive user interface for both gym owners and regular users.

---

## Backend

### Description

The backend handles the gym's core functionalities, including member, class, and pricing management, with API endpoints that the frontend interacts with. It's built with **Node.js**, **Express**, and connected to **MongoDB Atlas**.

### Database Setup

- **Cluster**: gymManagement (MongoDB Atlas)
- **Database**: gym_management

### Collections

- **classes**: Stores information about gym classes (title, instructor, schedule, timings, description, and image).
- **members**: Contains details like userId, username, membership type, start date, end date, payment mode, workout level, and government ID proof.
- **Future collections**:
  - **pricing**: For managing pricing plans and offers.
  - **users**: To handle user authentication for gym owners and regular users.

### Features

- **Member management**: Add/remove members.
- **Class management**: Add/edit/remove gym classes.
- **Pricing management**: Manage membership prices and offers.
- **Authentication**: Temporary hardcoded login for the gym owner (userId: 1, password: okinsuk). This will be replaced with a secure authentication system in future updates.

### Installation & Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:

    ```bash
    MONGODB_URI=your-mongodb-uri
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

   The backend server runs on `http://localhost:5000` by default.

---

## Frontend

### Description

The frontend is built with **React** and styled using **Bootstrap** to create a user-friendly interface for both gym owners and regular users.

### Features

- **Responsive design** using Bootstrap.
- **Gym owner-specific features**: Manage gym classes, members, and pricing.
- **Regular user features**: View class schedules and membership pricing.
- **Role-based UI**: Dynamic rendering for gym owners and regular users.

### Installation & Setup

1. Navigate to the frontend folder:

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

   The frontend runs on `http://localhost:3000` by default.

---

## Project Workflow

1. **Frontend** interacts with the **backend** via API calls to manage gym operations.
2. **Backend** connects to **MongoDB** for data storage and retrieval.

---

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **Authentication**: Future iterations will include a secure JWT-based authentication system.

---

## Running the Full Application

1. **Run the Backend**: 
   
    ```bash
    cd backend
    npm start
    ```

2. **Run the Frontend**: 

    Open a new terminal window and start the React frontend:

    ```bash
    cd frontend
    npm start
    ```

---
## Hardcoded Login for Gym Owner

For development and testing purposes, the gym owner login is currently hardcoded as follows:

```bash
# Gym Owner Credentials
userId: 1
Password: okinsuk
```

---

## Gym Management System - UI Screenshots Overview

1. **Home Page**:
    ![image](https://github.com/user-attachments/assets/8046221f-a800-4b9c-bb18-89c0f258b420)

2. **Classes Page**:
    ![image](https://github.com/user-attachments/assets/9e72b50a-659e-4f63-9543-098fa2d2bc8f)

3. **Member Page**:
    ![image](https://github.com/user-attachments/assets/38984d48-c7a6-42a9-8604-7283d5741fac)

---

## Future Updates

- Secure authentication system for both gym owners and regular users.
- New **Products Page**.
- UI enhancement with light and dark theme support.
