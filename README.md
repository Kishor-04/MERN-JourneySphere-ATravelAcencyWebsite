JoutneySphere - A travel Agency Website

Project Descriptio:n
This project is a web application designed to provide users with a seamless and intuitive login and signup experience. 
The application features a responsive frontend built with React and Tailwind CSS, and communicates with a backend server 
to authenticate users securely. The overall goal is to ensure efficient user management and smooth navigation.



Setup Instructions
Backend Setup:

Clone the repository:
1.git clone https://github.com/Kishor-04/MERN-JourneySphere-ATravelAcencyWebsite/tree/main/Backend

2.Navigate to the backend directory:
cd backend

3.Install dependencies:
npm install

4.Start the backend server:
npm start

5.he backend will be running on http://localhost:5000.



Frontend Setup
1.Clone the repository:
git clone https://github.com/Kishor-04/MERN-JourneySphere-ATravelAcencyWebsite/tree/main/Frontend

2.Navigate to the frontend directory:
cd frontend

3.Install dependencies:
npm install

4.Start the frontend application:
npm start

5.The frontend will be available on http://localhost:3000.



--Environment Variables
For proper functioning, create a .env file in the backend with the following variables:

PORT=5000
JWT_SECRET=<your_jwt_secret>
DB_URL=<your_database_url>



Features
1.Authentication
Login: Users can securely log into their accounts using their email and password.
Signup: Users can create new accounts by providing their name, email, and password.

2.User Experience
Fully responsive design using Tailwind CSS.
Modern and attractive UI with blur effects and themed components.

3.Token Management
JWT-based authentication for secure and efficient user sessions.
Token stored in localStorage for persistent user login.

4.Navigation
Smooth navigation between Login, Signup, and Home pages using React Router.

5.Error Handling
Informative alerts for missing or incorrect input fields.
Display server-side error messages for failed requests.



Future Enhancements
1.Implement password reset functionality.
2.Add social media login options (e.g., Google, Facebook).
3.Enhance security with CAPTCHA and multi-factor authentication.
4.Integrate a dashboard for logged-in users to manage their profiles.
