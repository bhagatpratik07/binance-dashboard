const express = require("express");
const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

// Cors middleware
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Binance API endpoint
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

// Fetch data from Binance API
async function fetchData() {
  try {
    const response = await axios.get(BINANCE_API_URL);
    const data = response.data;
    io.emit("update", data);
  } catch (error) {
    console.error("Error fetching data from Binance API:", error);
    return [];
  }
}

io.on("connection", (socket) => {
  console.log("A client connected");

  // Fetch data immediately when a client connects
  fetchData();

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const fetchDataInterval = setInterval(fetchData, 1000);

server.on("close", () => {
  clearInterval(fetchDataInterval);
  console.log("Server stopped");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server started");
});
