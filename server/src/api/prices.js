const axios = require("axios");
const { BINANCE_API_URL } = require("../config");

async function fetchData(io) {
  try {
    const response = await axios.get(BINANCE_API_URL);
    const data = response.data;
    io.emit("update", data);
  } catch (error) {
    console.error("Error fetching data from Binance API:", error);
    return [];
  }
}

module.exports = fetchData;
