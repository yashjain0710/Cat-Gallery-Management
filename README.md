# 🐱 Cat Gallery Management System API

A RESTful API for managing a Cat Gallery, built with **Node.js**, **Express**, and **MongoDB Atlas**. Features image uploads via **Cloudinary**, authentication with **JWT**, and route protection using **Passport.js**.

---

## 🚀 Features

- **User Authentication** — Register & Login with hashed passwords (bcrypt) and JWT tokens
- **CRUD Operations** — Create, Read, Update, and Delete cat entries
- **Image Uploads** — Upload cat images directly to Cloudinary
- **Route Protection** — Passport.js JWT strategy secures add/update/delete endpoints
- **Environment Variables** — Sensitive credentials stored securely in `.env`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Cloudinary | Image Hosting |
| Multer | File Upload Handling |
| Passport.js | JWT Authentication |
| bcryptjs | Password Hashing |
| jsonwebtoken | Token Generation |

---

## 📁 Project Structure

```
Cat-Gallery-Management/
├── config/
│   ├── cloudinary.js      # Cloudinary SDK configuration
│   ├── db.js              # MongoDB Atlas connection
│   └── passport.js        # Passport JWT strategy
├── controller/
│   ├── authController.js  # Register & Login logic
│   └── catController.js   # Cat CRUD logic
├── models/
│   ├── Auth.js            # User schema
│   └── Cat.js             # Cat schema
├── router/
│   ├── authRouter.js      # Auth routes
│   └── catRoute.js        # Cat routes (with Passport protection)
├── uploads/               # (Local fallback folder)
├── .env                   # Environment variables (not tracked)
├── .gitignore
├── .npmrc
├── index.js               # Entry point
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yashjain0710/Cat-Gallery-Management.git
cd Cat-Gallery-Management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory

```env
MONGO_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm start
```

The server will start on `http://localhost:3002`.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Login & get JWT token | ❌ |

### Cat Management

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/v1/add/cat` | Add a new cat (with image) | ✅ Bearer Token |
| GET | `/api/v1/get/cats` | Get all cats | ❌ |
| GET | `/api/v1/get/cat/:id` | Get a specific cat | ❌ |
| PUT | `/api/v1/update/cat/:id` | Update a cat | ✅ Bearer Token |
| DELETE | `/api/v1/del/cat/:id` | Delete a cat | ✅ Bearer Token |

---

## 🧪 Testing with Postman

### Step 1: Register

**POST** `http://localhost:3002/auth/register`

Body → raw → JSON:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mypassword"
}
```

### Step 2: Login & Copy Token

**POST** `http://localhost:3002/auth/login`

Body → raw → JSON:
```json
{
  "email": "johndoe@example.com",
  "password": "mypassword"
}
```

Copy the `token` from the response.

### Step 3: Add a Cat (Protected 🔒)

**POST** `http://localhost:3002/api/v1/add/cat`

- **Auth tab** → Bearer Token → Paste your token
- **Body** → form-data:

| Key | Value | Type |
|---|---|---|
| name | Whiskers | Text |
| breed | Persian | Text |
| description | A fluffy cat | Text |
| age | 3 | Text |
| gender | Male | Text |
| color | White | Text |
| isAdopted | false | Text |
| image | *(select file)* | File |

---

## 🐱 Cat Schema

```javascript
{
  name:        { type: String, required: true },
  breed:       { type: String, required: true },
  description: { type: String, required: true },
  age:         { type: Number },
  gender:      { type: String, enum: ['Male', 'Female', 'Unknown'] },
  color:       { type: String },
  isAdopted:   { type: Boolean, default: false },
  image:       { type: String },
  timestamps:  true
}
```

---

## 🌐 Deployment

This project is deployment-ready for **Render**:

1. Connect your GitHub repo on [Render](https://render.com)
2. Set **Build Command** → `npm install`
3. Set **Start Command** → `npm start`
4. Add your `.env` variables under **Environment → Environment Variables**

---

## 📝 License

ISC
