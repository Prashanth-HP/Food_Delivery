# 🍔QuickBite - Food Delivery Application

A full-stack web application for food delivery built with Angular, Node.js, and MySQL.

## 📋 Table of Contents
- [✨ Features](#features)
- [🛠️ Technologies](#technologies)
- [⚙️ Installation](#installation)
- [🗃️ Database Schema](#database-schema)
- [🔌 API Endpoints](#api-endpoints)
- [📜 License](#license)

## ✨ Features

### 🧑‍💻 User Features
- Browse restaurants without authentication
- View restaurant details (name, location, cuisine type)
- Place orders with multiple items
- Track order status (Pending → Preparing → Out for Delivery → Delivered)
- Cancel orders before they go "Out for Delivery"

### 🏨 Restaurant Management
- Restaurant listing with details
- Filter by cuisine type
- Detailed view for each restaurant

## 🛠️ Technologies

### Frontend
- Angular 16
- TypeScript

### Backend
- Node.js with Express
- TypeScript
- REST API architecture

### Database
- MySQL 8
- JSON data storage for order items

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/food-delivery-app.git

# 2. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 3. Set up database
# - Create MySQL database from schema.sql
# - Configure connection in backend/.env

# 4. Run the application
# Frontend
cd frontend && ng serve

# Backend
cd backend && npm start
```

### 🗃️ Database Schema
restaurants Table
| Column        | Type          | Constraints                          |
|---------------|---------------|--------------------------------------|
| id            | INT           | PRIMARY KEY, AUTO_INCREMENT          |
| name          | VARCHAR(255)  | NOT NULL                             |
| location      | VARCHAR(255)  | NOT NULL                             |
| cuisine_type  | VARCHAR(100)  | NOT NULL                             |
| created_at    | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP            |
| rating        | DECIMAL(3,1)  | -                                    |
| imageUrl      | VARCHAR(255)  | -                                    |

orders Table
| Column            | Type              | Constraints                          |
|-------------------|-------------------|--------------------------------------|
| id                | INT               | PRIMARY KEY, AUTO_INCREMENT          |
| restaurant_id     | INT               | FOREIGN KEY REFERENCES restaurants(id)|
| items             | JSON              | NOT NULL                             |
| total_price       | DECIMAL(10,2)     | NOT NULL                             |
| delivery_address  | TEXT              | NOT NULL                             |
| status            | ENUM              | DEFAULT 'Pending'                    |
| created_at        | TIMESTAMP         | DEFAULT CURRENT_TIMESTAMP            |


## 🔌 API Endpoints
Restaurant API
| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /api/restaurants       | Get all restaurants    |
| GET    | /api/restaurants/:id   | Get restaurant details |

Order API
| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | /api/orders            | Create new order                 |
| GET    | /api/orders/:id        | Get order details                |
| PUT    | /api/orders/:id        | Update order status              |
| DELETE | /api/orders/:id        | Cancel order                     |



## 📜 License
This project is licensed under the MIT License.
