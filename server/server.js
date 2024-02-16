const http = require("http");
const setupSocketIO = require("./src/sockets");
const { PORT } = require("./src/config");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());

const server = http.createServer(app);

setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
