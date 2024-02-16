const fetchData = require("../api/prices");

function setupSocketIO(server) {
  const io = require("socket.io")(
    "https://binance-dashboard-production.up.railway.app/",
    {
      cors: {
        origin: "*",
      },
    }
  );

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
