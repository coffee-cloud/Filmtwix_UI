import { useState, useEffect, useRef } from "react";
import { Box, Paper, TextField, Typography, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function ChatWindow({ isLoggedIn, messages, setMessages,darkMode }) {
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(() => `session_${Math.random().toString(36).substr(2, 9)}`); // Generate random session ID
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    console.log(input, sessionId);
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    const apiEndpoint = "https://filmtwix-g6afhkdqdsepgkex.centralindia-01.azurewebsites.net/chat/";
    const requestBody = { session_id: sessionId, prompts: [input] }; // Include session_id in the request body

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching AI response:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = { text: data.response || "I'm sorry, I didn't understand that.", sender: "ai" };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);

      if (isLoggedIn) localStorage.setItem("chatHistory", JSON.stringify(finalMessages));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("Error fetching AI response. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2, height: "90vh" }}>
      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              my: 1,
            }}
          >
            <Paper
              sx={{
                p: 1.5,
                bgcolor: msg.sender === "ai" ? "transparent" : "transparent",
                color: msg.sender === "ai" ? "inherit" : "inherit",
                maxWidth: "60%",
                boxShadow: msg.sender === "user" ? "none" : undefined,
              }}
            >
              <Typography>{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Chat Input */}
      <Box sx={{ display: "flex", p: 1,bgcolor: darkMode ? "grey.900" : "grey.100" }}>
      
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Fixed deprecated onKeyPress
          sx={{
            input: { color: darkMode ? "white" : "grey.900" },
            bgcolor: darkMode ? "grey.900" : "white"
          }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}


