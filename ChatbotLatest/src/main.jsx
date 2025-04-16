import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
 
export default function Main() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  // Load login state from localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);
 
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Router>
    </ThemeProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

