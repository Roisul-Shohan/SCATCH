# Scatch - E-Commerce Application

A modern e-commerce application built with Node.js, Express, and EJS. Features user authentication, product management, and shopping cart functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Deployment on Railway](#deployment-on-railway)

## ✨ Features

- **User Authentication**: Register and login with bcrypt password hashing
- **Product Management**: Browse and create products
- **Shopping Cart**: Add/remove products to cart
- **User Profile**: View and edit user profile with image upload
- **Session Management**: Secure session handling with express-session
- **JWT Authentication**: Token-based authentication
- **File Upload**: Multer integration for image uploads

## 🛠️ Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **Frontend**: EJS templating engine
- **File Upload**: Multer
- **Session Management**: express-session
- **Environment Variables**: dotenv

## 📦 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (for database)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd scatch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_KEY=your_jwt_secret_key

# Session Configuration
EXPRESS_SESSION_SECRET=your_session_secret

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net

# Other Configuration
CONFIG_ENVIRONMENT=development
```

## 🔑 Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_KEY` | Secret key for JWT token generation | `your_secret_key_here` |
| `EXPRESS_SESSION_SECRET` | Secret for session encryption | `session_secret_key` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `PORT` | Server port (optional, defaults to 3000) | `3000` |

## 📁 Project Structure

```
scatch/
├── config/              # Configuration files
│   ├── development.json # Development configuration
│   ├── keys.js          # Secret keys
│   ├── mongoose-connection.js
│   └── multer-config.js # File upload configuration
├── controllers/         # Business logic
│   └── authController.js
├── middlewares/         # Custom middleware
│   ├── errorHandler.js
│   └── isLoggedin.js
├── models/              # Database models
│   ├── owner-model.js
│   ├── product-model.js
│   └── user-model.js
├── public/              # Static files
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
├── routes/              # Route definitions
│   ├── index.js
│   ├── ownersRouter.js
│   ├── productsRouter.js
│   └── usersRouter.js
├── utils/               # Utility functions
│   └── generateToken.js
├── views/               # EJS templates
│   ├── cart.ejs
│   ├── createproducts.ejs
│   ├── editprofile.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── shop.ejs
│   └── signup.ejs
├── app.js               # Main application file
└── package.json         # Project dependencies
```

## 💻 Running Locally

1. **Start the development server**:

```bash
npm start
```

The application will run on `http://localhost:3000`

2. **Available Routes**:
   - `/` - Home page
   - `/signup` - User registration
   - `/login` - User login
   - `/shop` - Product listing (requires login)
   - `/logout` - User logout
   - `/users/cart` - Shopping cart
   - `/users/profile` - User profile
   - `/users/edit` - Edit profile

## 📝 API Endpoints

### Authenticationre
### Users
- `GET /users/cart` - View shopping cart
- `GET /users/addToCart/:id` - Add product to cart
- `GET /users/delete/:id` - Remove item from cart
- `GET /users/profile` - View user profile
- `GET /users/edit` - Edit profile page
- `POST /users/edit` - Update profile

### Products
- `GET /products` - Get all products
- `GET /shop` - Shop page with products

### Owners
- `GET /owners` - Owner routes

## 🔒 Security Notes

- All passwords are hashed with bcrypt (salt rounds: 10)
- JWT tokens are used for secure authentication
- Session secrets should be strong and unique
- Never commit `.env` file to version control
- Keep your MongoDB URI secure

## 🐛 Troubleshooting

**Issue**: "Cannot find module" error
- **Solution**: Run `npm install` again

**Issue**: Connection refused to MongoDB
- **Solution**: Check your `MONGODB_URI` and ensure MongoDB Atlas is accessible

**Issue**: Images not uploading
- **Solution**: Ensure `multer-config.js` is properly set up and `./public/images` directory exists

**Issue**: Session not persisting
- **Solution**: Check `EXPRESS_SESSION_SECRET` is set in environment variables

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name / Project Owner

---

**Happy coding! 🚀**
