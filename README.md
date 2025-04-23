# 🍔 QuickBite - Food Delivery Application

![QuickBite Home Page](./Output/Home%20Page.jpg)  
*Discover restaurants near you with our intuitive home page*

A full-stack web application for food delivery built with Angular, Node.js, and MySQL.

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠️ Technologies](#-technologies)
- [⚙️ Installation](#-installation)
- [🗃️ Database Schema](#-database-schema)
- [🔌 API Endpoints](#-api-endpoints)
- [📜 License](#-license)

## ✨ Features

### 🏠 Home Page Experience
![Home Page](./Output/Home%20Page.jpg)  
*Browse restaurants by cuisine type and location*

- Discover trending restaurants
- Filter by cuisine type or dietary preferences
- View estimated delivery times

### 🛒 Order Customization
![Menu Items](./Output/Restaurant%20menu%20items.jpg)  


### 🍽️ Restaurant Menu
![Restaurant Menu Page](./Output/Restaurant%20menu%20page.jpg)  
*Full menu with categories and special offers*

- View complete restaurant menu
- See item details and customer ratings
- Apply filters (vegetarian, spicy, etc.)

### ⚡ Quick Order Flow
![Quick Order](./Output/Quick%20order.jpg)  
*Express checkout for returning customers*

- One-tap reorder functionality
- Saved favorite orders
- Address auto-complete


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
