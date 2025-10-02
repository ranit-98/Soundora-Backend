Spotify Clone Backend
This is the backend for a Spotify-like music platform built with Node.js, TypeScript, Express, MongoDB, and Socket.IO. It provides APIs for user authentication (Google OAuth), song and album management, admin functionalities, and real-time messaging. The API documentation is served via Swagger UI.
Table of Contents

Features
Technologies
Prerequisites
Setup
Running the Application
API Documentation
Environment Variables
Project Structure
Contributing
License

Features

User authentication with Google OAuth and JWT.
CRUD operations for songs, albums, and users.
Admin routes for managing platform content.
Real-time messaging using Socket.IO.
File uploads for songs and album covers using Cloudinary.
Scheduled cleanup of temporary files using node-cron.
API documentation with Swagger UI.

Technologies

Node.js: Runtime environment.
TypeScript: Static typing for JavaScript.
Express: Web framework for API routes.
MongoDB: Database for storing users, songs, and albums.
Mongoose: ODM for MongoDB.
Socket.IO: Real-time communication.
Cloudinary: Cloud storage for media files.
Google-auth-library: Google OAuth integration.
jsonwebtoken: JWT authentication.
Swagger UI: API documentation.
node-cron: Scheduled tasks.

Prerequisites

Node.js: Version 22.14.0 or higher.
MongoDB: Local or cloud instance (e.g., MongoDB Atlas).
Cloudinary Account: For media uploads.
Google Cloud Console: For OAuth credentials.
Git: For version control.

Setup

Clone the Repository:
git clone <repository-url>
cd spotify-clone/Backend


Install Dependencies:
npm install


Create .env File:Create a .env file in the Backend directory with the following:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/music_platform
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com

Replace placeholders with your actual credentials.

Verify MongoDB:Ensure MongoDB is running locally or update MONGODB_URI for a cloud instance.


Running the Application

Build the Project:Compile TypeScript to JavaScript:
npm run build


Start the Server:Run the compiled server:
npm start


Development Mode:Run with TypeScript watch and nodemon for hot-reloading:
npm run dev

Expected output:
Server is running on port 3001
Swagger YAML loaded successfully
Connected to MongoDB <host>



API Documentation

Access the Swagger UI at: http://localhost:3001/api-docs
The API is documented using swagger.yaml, which includes endpoints for authentication, users, songs, albums, stats, and admin functionalities.

Environment Variables



Variable
Description



PORT
Server port (default: 3001)


MONGODB_URI
MongoDB connection string


CLOUDINARY_CLOUD_NAME
Cloudinary cloud name


CLOUDINARY_API_KEY
Cloudinary API key


CLOUDINARY_API_SECRET
Cloudinary API secret


GOOGLE_CLIENT_ID
Google OAuth client ID


GOOGLE_CLIENT_SECRET
Google OAuth client secret


JWT_SECRET
Secret for JWT signing


ADMIN_EMAIL
Email for admin user


Project Structure
spotify-clone/Backend/
├── src/
│   ├── constants/         # Constants (e.g., HTTP status codes)
│   ├── lib/               # Database and Socket.IO utilities
│   ├── middleware/        # Express middleware (e.g., error handling)
│   ├── routes/            # API route handlers
│   ├── app.ts             # Express app setup
│   ├── server.ts          # Server entry point
├── dist/                  # Compiled JavaScript files
├── swagger.yaml           # Swagger API documentation
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Node.js dependencies and scripts
├── tsconfig.json          # TypeScript configuration

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

License
This project is licensed under the ISC License.