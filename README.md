

# E-Commerce Application

This project is an E-Commerce web application built using Node.js, Express, MongoDB, and React. It includes features for user registration, login, product management, order management, and payment processing.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- User registration and authentication (JWT-based)
- Admin authentication and authorization
- Product management (add, update, delete)
- Order management
- Payment processing with Razorpay
- Static list of categories
- Responsive frontend built with React

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=8081
   NODE_MODE=development
   JWT_SECRET=your_jwt_secret
   KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_key_secret
   ```

4. Connect to your MongoDB database:
   - Update the connection string in `db.js` with your MongoDB URI.

5. Run the application:
   ```bash
   npm start
   ```

## Usage

### Running the server

```bash
npm start
```

The server will start on the port specified in your `.env` file.

### Running the frontend

Navigate to the frontend directory and follow the instructions in the `README.md` file located there.

## Project Structure

- **controllers/**: Contains controller functions for user registration, login, and authentication.
- **middlewares/**: Contains middleware functions for authentication and authorization.
- **models/**: Contains Mongoose models for Users, Products, and Orders.
- **routes/**: Contains route definitions for user, product, and order endpoints.
- **db.js**: Contains the MongoDB connection setup.
- **app.js**: The main entry point for the application, sets up middleware and routes.

## API Endpoints

### User Routes

- `POST /user/register` - Register a new user
  - Validates user input, hashes the password using bcrypt, and saves the user to the database.
- `POST /user/login` - Login an existing user
  - Authenticates the user, compares the password, and generates a JWT token.
- `POST /user/getUserData` - Get user data (requires JWT token)
  - Verifies the JWT token and retrieves user data.

### Product Routes

- `POST /add-product` - Add a new product (requires admin authentication)
  - Adds a new product to the database.
- `PUT /update-product/:id` - Update a product by ID (requires admin authentication)
  - Updates the details of an existing product.
- `GET /products` - Get all products
  - Retrieves all products from the database.

### Order Routes

- `POST /order` - Place a new order
  - Adds a new order to the user's order list.
- `GET /my_orders/:id` - Get orders by user email
  - Retrieves orders for a specific user by email.

### Payment Routes

- `POST /online_payment` - Create a Razorpay order
  - Creates an order in Razorpay for payment processing.
- `POST /verify` - Verify a Razorpay payment
  - Verifies the payment signature from Razorpay.

### Categories Routes

- `GET /categories` - Get a list of static categories
  - Returns a static list of product categories.

## Environment Variables

- `PORT`: The port on which the server runs.
- `NODE_MODE`: The mode in which the server runs (e.g., development, production).
- `JWT_SECRET`: The secret key for JWT authentication.
- `KEY_ID`: Razorpay key ID for payment processing.
- `KEY_SECRET`: Razorpay key secret for payment processing.

## License

This project is licensed under the MIT License.

Screenshots
![image](https://github.com/user-attachments/assets/b3db823e-29bc-4dcf-814e-9a9117622eb3)
![image](https://github.com/user-attachments/assets/cbbe7b17-330d-4fb8-bc30-455de16d3350)

