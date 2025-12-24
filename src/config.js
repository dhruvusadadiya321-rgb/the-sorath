// src/config.js

// Check kare che ke project localhost par che ke live server par
const isLocal = window.location.hostname === "localhost";

// Jo Local hoy to localhost:5000 vapar, nahitar Render vali link vapar
export const API_URL = isLocal 
  ? "http://localhost:5000/api" 
  : "https://the-sorath-backend.onrender.com/api";

// Aa file tamne automatic sachi link apse!