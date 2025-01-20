# MERN Blog CMS

A fully-featured Content Management System built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring secure authentication, user roles, and modern UI components.

## Features

- **Secure Authentication**
  - JWT-based authentication system
  - User roles and permissions
  - Email verification
  - Password recovery via Nodemailer
  - Google OAuth integration

- **Content Management**
  - Full CRUD operations for blog posts
  - Rich text editing with React-Quill
  - Multimedia content support via Firebase Storage
  - Comment system
  - User profile management

- **Modern UI/UX**
  - Responsive design using Tailwind CSS
  - Interactive components with Flowbite-React
  - Clean and intuitive interface
  - Progress indicators and loading states
  - Mobile-first approach

- **Advanced State Management**
  - Redux implementation with Redux Toolkit
  - Persistent state with Redux-Persist
  - Centralized state management
  - Optimized performance

## Tech Stack

### Frontend
- React 18
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Flowbite React
- Firebase (Storage)
- Axios
- React-Quill
- Moment.js

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Nodemailer
- JOI (Data validation)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Firebase account (for media storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/RahulKoju/mern-blog.git
cd mern-blog
```

2. Install dependencies for both backend and frontend
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the development servers
```bash
# Start backend server
npm run dev

# In a separate terminal, start frontend
cd client
npm run dev
```

## Deployment

The application is configured for deployment on Render. The build script handles both frontend and backend deployment:

```bash
npm run build
```

## Project Structure

```
mern-blog/
├── api/              # Backend server code
├── client/           # Frontend React application
├── package.json      # Backend dependencies
└── README.md
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
