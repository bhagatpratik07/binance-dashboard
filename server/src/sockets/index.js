const fetchData = require("../api/prices");

function setupSocketIO(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected");
    fetchData(io);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  const fetchDataInterval = setInterval(() => fetchData(io), 1000);

  server.on("close", () => {
    clearInterval(fetchDataInterval);
    console.log("Server stopped");
  });

  return io;
}

module.exports = setupSocketIO;
