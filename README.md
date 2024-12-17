JoutneySphere - A travel Agency Website

Project Descriptio:n
This project is a web application designed to provide users with a seamless and intuitive login and signup experience. 
The application features a responsive frontend built with React and Tailwind CSS, and communicates with a backend server 
to authenticate users securely. The overall goal is to ensure efficient user management and smooth navigation.



Setup Instructions
Backend Setup:

Clone the repository:
git clone <backend-repo-url>

Navigate to the backend directory:
cd backend

Install dependencies:
npm install

Start the backend server:
npm start

The backend will be running on http://localhost:5000.



Frontend Setup
Clone the repository:
git clone <frontend-repo-url>

Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Start the frontend application:
npm start

The frontend will be available on http://localhost:3000.



Environment Variables
For proper functioning, create a .env file in the backend with the following variables:

PORT=5000
JWT_SECRET=<your_jwt_secret>
DB_URL=<your_database_url>



Features
Authentication
Login: Users can securely log into their accounts using their email and password.
Signup: Users can create new accounts by providing their name, email, and password.

User Experience
Fully responsive design using Tailwind CSS.
Modern and attractive UI with blur effects and themed components.

Token Management
JWT-based authentication for secure and efficient user sessions.
Token stored in localStorage for persistent user login.

Navigation
Smooth navigation between Login, Signup, and Home pages using React Router.

Error Handling
Informative alerts for missing or incorrect input fields.
Display server-side error messages for failed requests.



Future Enhancements
Implement password reset functionality.
Add social media login options (e.g., Google, Facebook).
Enhance security with CAPTCHA and multi-factor authentication.
Integrate a dashboard for logged-in users to manage their profiles.
