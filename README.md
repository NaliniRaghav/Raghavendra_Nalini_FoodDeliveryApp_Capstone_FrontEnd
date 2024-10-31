CAPSTONE PROJECT - FRONTEND

Food on the Fly - Online Food Delivery Application

Overview 
Food on the Fly is a full-stack online food delivery application, built with the MERN stack (MongoDB, Express, React, Node.js). The application provides users with a seamless experience for browsing restaurants, viewing menu items, adding items to a cart, and placing orders. The backend manages user authentication, restaurant and menu data, and order processing with secure, scalable APIs.

Table of Contents 
    1. Features
    2. Packages Used 
    3. Application Structure 
    4. API Endpoints
    5. Setup and Installation 
    6. Future Enhancements

Features

     User Management 

    Signup/Login/Logout: Users can register, log in, and securely log out. 

    Password Reset: Provides password reset functionality via email verification. 

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

The FoodOnTheFly project is organized into two main directories: backend and frontend. Backend 
The backend directory houses the server-side logic and data handling. Inside the index.js is responsible for setting up the database connection configuration for MongoDB. The FoodOntheFly_Db is the name of the database.
The .env file stores environment variables, such as database URIs and secret keys. Finally, index.js is the main server file that initializes and runs the backend server.

 The installation and route details used in the project are available in the README.md file under the folder  Nalini_Raghavendra_Capstone_BackEnd. 
Frontend 
The frontend directory contains the client-side interface built with React. 
The public folder includes static assets accessible to the client.
 Inside src, the components folder holds reusable UI components.

The pages folder stores the main pages of the application. 
LoginPage.jsx presents the login interface. 
SignupForm.jsx allows new users to register.
 PasswordResetPage.jsx enables password reset functionality. 
RestaurantDisplayForm.jsx shows a list of available restaurants. 
MenuItemDisplay.jsx displays the menu items for a selected restaurant. 
UserProfile.jsx displays the user details. User can update his informations like
address, phone number using this form.
App.jsx serves as the main React application, routing and orchestrating the components. 
main.jsx is the entry point that renders the React application in the browser. 
The project’s documentation, guidelines, and setup instructions are outlined in the README.md file at the root level, providing a comprehensive overview of the application and its components.

API Endpoints

The available API routes are:
Users API  
POST /api/users/signup - To create a new user account.  
POST /api/users/login - To log in an existing user.  
GET /api/users/me - To get the current user profile.  
PUT /api/users/me - To update the current user profile.  
GET /api/users - To get all users.  
GET /api/users/{user_id} - To get a single user by ID.  
DELETE /api/users/{user_id} - To delete a user by ID.  
POST /api/users/reset-password - To reset the user's password.  

Restaurants API  
GET /api/restaurants/cuisines - To get all unique cuisine types.  
GET /api/restaurants/zipcodes - To get unique zip codes from restaurants.  
POST /api/restaurants - To create a new restaurant.  
GET /api/restaurants - To get a list of all restaurants.  
GET /api/restaurants/{id} - To get a single restaurant by ID.  
PATCH /api/restaurants/{id}/image - To update a restaurant's image.  
POST /api/restaurants/{id}/menuItems - To add a menu item to a restaurant.  
DELETE /api/restaurants/{id} - To delete a restaurant by ID.  
GET /api/menuItems/restaurants/{restaurantId}/menu - To get menu items for a specific restaurant.  

Menu Items API  
POST /api/menuItems - To create a new menu item.  
GET /api/menuItems - To get all menu items.  
GET /api/menuItems/restaurants/:restaurantId/menu - To get menu items by restaurant ID.  
GET /api/menuItems/:id - To get a single menu item by ID.  
PUT /api/menuItems/:id - To update a menu item by ID.  
DELETE /api/menuItems/:id - To delete a menu item by ID.  
PATCH /api/menuItems/:id/image - To update a menu item's image.  

Orders API  
GET /api/orders - To get all order details.  
GET /api/orders/:id - To get details of a specific order by ID.  
POST /api/orders - To create a new order.  
PUT /api/orders/:id - To update an existing order by ID.  
DELETE /api/orders/:id - To delete an order by ID.  

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
 Navigate to the frontend folder
 cd ../Raghavendra_Nalini_FoodDeliveryApp_Capstone_FrontEnd
 Install dependencies
 npx create vite@latest
 npm install react-router-dom
 npm install axios
  Npm install cors
 npm install dotenv
 npm install react-icons
 npm run dev
 Access the Application:
 Open your browser and go to http://localhost:5173 to view the application.

  Future Enhancements 

  1. Real-Time Order Tracking: Implement real-time order tracking to keep users informed about the delivery status.
  2. Enhanced User Profiles: Expand profile management to include order history, favorite restaurants, and personalized recommendations.
  3. Restaurant Reviews: Enable users to leave reviews and rate restaurants, adding a layer of interactivity and feedback. 
 1. Loyalty Program: Integrate a loyalty program to reward frequent users with discounts, incentives, or rewards points.
  2. Admin Panel: Add an admin dashboard for restaurant management, menu updates, and order tracking. 
 2. Mobile App: Develop a mobile version of the application using React Native for cross-platform support.
 
   Conclusion
   Food on the Fly is a comprehensive online food delivery application designed with a focus on user experience, scalability, and real-world functionality. This project showcases skills in full-stack development, API creation, user authentication, and state management. It serves as a foundation for further feature enhancements and scaling.

  Acknowledgments:

A special thank you to my instructors at Per Scholas (https://perscholas.org/):

- Mr. Colton Wright and Mr. Abraham E. Tavarez – MERN instructors, for their invaluable guidance and technical support.

Resource:
 

- (https://github.com/)
- (https://www.youtube.com/)
