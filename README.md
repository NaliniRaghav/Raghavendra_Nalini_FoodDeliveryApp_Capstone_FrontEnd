Food on the Fly - Online Food Delivery Application

Overview Food on the Fly is a full-stack online food delivery application, built with the MERN stack (MongoDB, Express, React, Node.js). The application provides users with a seamless experience for browsing restaurants, viewing menu items, adding items to a cart, and placing orders. The backend manages user authentication, restaurant and menu data, and order processing with secure, scalable APIs.

Table of Contents 
1. Features
 2. Packages Used 
3. Application Structure 
4. API Endpoints
 5. Setup and Installation 
6. Future Enhancements

Features User Management 

Signup/Login/Logout: Users can register, log in, and securely log out. 

Password Reset:         Provides password reset functionality via email verification. 

Profile Management: Allows users to manage their profiles, including address and contact details.

 Restaurant and Menu Management Restaurant Display: Users can browse restaurants, filter by cuisine and location, and sort by ratings and price.

 Menu Display: Each restaurant displays its menu items, descriptions, and pricing.

 Order and Cart Management Cart: Users can add items to a cart, adjust quantities, and view the total amount before placing an order. 

Order Processing: Orders are processed through a secure checkout form, calculating total costs and handling order placement.

Technologies Used:

 MongoDB: Used as the database to store user data, restaurants, and order history. Express: Serves as the backend framework, handling APIs and authentication.
 React: Provides a dynamic and responsive user interface with reusable components. Node.js: Manages the server, processes requests, and interfaces with MongoDB.
Packages Used Backend (Node.js & Express)
 1. Express: Simplifies routing and server setup. 
2. Mongoose: Manages MongoDB data models with schemas and easy-to-use query methods.
 3. dotenv: Loads environment variables securely from a .env file. 
4. CORS: Allows the frontend and backend to communicate securely by handling cross-origin requests.
Frontend (React) 
1. React Router: Handles routing between multiple pages within the application.
 2. Axios: Simplifies HTTP requests for interacting with backend APIs. 
3. React Hooks: Manages state and lifecycle methods across components
. 4. CSS Modules: Provides component-scoped CSS to manage styling and avoid conflicts.

Application Structure 

The FoodOnTheFly project is organized into two main directories: backend and frontend. Backend The backend directory houses the server-side logic and data handling. Inside the index.js is responsible for setting up the database connection configuration for MongoDB. The FoodOntheFly_Db is the name of the database.
The .env file stores environment variables, such as database URIs and secret keys. Finally, index.js is the main server file that initializes and runs the backend server.

 The installation and route details used in the project are available in the README.md file under the folder  Nalini_Raghavendra_Capstone_BackEnd. 
Frontend The frontend directory contains the client-side interface built with React. 
The public folder includes static assets accessible to the client.
 Inside src, the components folder holds reusable UI components.

The pages folder stores the main pages of the application: 
LoginPage.jsx presents the login interface. 
SignupPage.jsx allows new users to register.
 ResetPasswordPage.jsx enables password reset functionality. 
RestaurantDisplay.jsx shows a list of available restaurants. 
MenuItemDisplay.jsx displays the menu items for a selected restaurant. 
App.jsx serves as the main React application, routing and orchestrating the components. 
main.jsx is the entry point that renders the React application in the browser. 
The project’s documentation, guidelines, and setup instructions are outlined in the README.md file at the root level, providing a comprehensive overview of the application and its components.
API Endpoints 
User Authentication 
POST /api/users/signup: Register a new user.
 POST /api/users/login: Login for existing users. 
POST /api/users/reset-password: Request a password reset. 
Restaurants
 GET /api/restaurants: Get a list of restaurants with optional filters (cuisine, location, rating).
 GET /api/restaurants/: Get details of a specific restaurant by ID.
 Menu Items 
GET /api/menuItems/restaurants/
Get a list of menu items for a specific restaurant. 
Cart and Orders 
POST /api/orders: Place an order with items from the cart. 
GET /api/orders/user/: Get the order history for a specific user.

Setup and Installation

 Prerequisites Node.js and npm installed MongoDB instance running locally or via a cloud provider like MongoDB Atlas Installation Clone the Repository:

git clone https://github.com/NaliniRaghav/Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
cd https://github.com/NaliniRaghav/Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd

cd Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
npm install
The connection to MongoDB details are available in the backend folder README.md.
Start the backend server
npm start
Frontend Setup:
* Navigate to the frontend folder
* cd ../Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
* Install dependencies
* npx create vite@latest
* npm install react-router-dom
* npm install axios
* Npm install cors
* npm install dotenv
* npm install react-icons
* npm run dev
* Access the Application:
* Open your browser and go to http://localhost:5173 to view the application.
* Future Enhancements 
* 1. Real-Time Order Tracking: Implement real-time order tracking to keep users informed about the delivery status.
*  2. Enhanced User Profiles: Expand profile management to include order history, favorite restaurants, and personalized recommendations.
*  3. Restaurant Reviews: Enable users to leave reviews and rate restaurants, adding a layer of interactivity and feedback. 
* 4. Loyalty Program: Integrate a loyalty program to reward frequent users with discounts, incentives, or rewards points.
*  5. Admin Panel: Add an admin dashboard for restaurant management, menu updates, and order tracking. 
* 6. Mobile App: Develop a mobile version of the application using React Native for cross-platform support.
* 
* Conclusion Food on the Fly is a comprehensive online food delivery application designed with a focus on user experience, scalability, and real-world functionality. This project showcases skills in full-stack development, API creation, user authentication, and state management. It serves as a foundation for further feature enhancements and scaling.
* 
