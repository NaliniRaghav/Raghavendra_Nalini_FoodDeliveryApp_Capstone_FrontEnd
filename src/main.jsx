// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import "./css/index.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>

//     {/* <BrowserRouter> */}
//     <App />
//     {/* </BrowserRouter> */}
//   </StrictMode>
// );

// To import necessary modules for rendering the app
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./css/index.css";

// To render the main App component within the root element
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* To provide routing capabilities for the application */}
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </StrictMode>
);
