import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Button, Box } from '@mui/material';
import Sidebar from './components/SideBar';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleLogin = () => {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    if (username === "admin" && password === "password123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("chatHistory"); // Clear chat history on logout
    setMessages([]); // Clear messages on logout
  };

  const handleNewChat = () => {
    setMessages([]); // Clear messages for new chat
    localStorage.removeItem("chatHistory"); // Clear chat history for new chat
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          
          <Button color="inherit" onClick={isLoggedIn ? handleLogout : handleLogin}>
            {isLoggedIn ? "Logout" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex' }}>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} handleNewChat={handleNewChat} />
        <ChatWindow isLoggedIn={isLoggedIn} messages={messages} setMessages={setMessages} darkMode={darkMode}/>
      </div>
    </ThemeProvider>
  );
}

