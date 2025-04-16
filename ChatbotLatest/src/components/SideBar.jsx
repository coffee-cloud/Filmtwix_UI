import { Drawer, List, ListItem, IconButton, Box, Tooltip } from "@mui/material";
import { Chat, DarkMode, LightMode, History, SupportAgent  } from "@mui/icons-material";

import { useState } from "react";

export default function Sidebar({ darkMode, setDarkMode, handleNewChat }) {
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);


  const loadChatHistory = () => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedMessages);
  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 80, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 1 }}>
          <SupportAgent />
          <Box sx={{ fontSize: "12px", textAlign: 'center' }}>
            FilmTwix
          </Box>
        </Box>
        {/* <List>
          {[Home, Settings].map((Icon, index) => (
            <ListItem button key={index} sx={{ justifyContent: "center" }}>
              <IconButton>{<Icon />}</IconButton>
            </ListItem>
          ))}
        </List> */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Chat History Button */}
        <Tooltip title="New Chat"><IconButton onClick={() => handleNewChat}><Chat /></IconButton></Tooltip>
        <Tooltip title="Chat History">
          <IconButton onClick={() => { setShowHistory((prev) => !prev); loadChatHistory(); }}><History />
          </IconButton>
        </Tooltip>
        <ListItem button sx={{ justifyContent: "center" }}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Drawer>
  );
}

