import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export const CoinsContext = createContext();

export const useCoins = () => useContext(CoinsContext);

export default function CoinsProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const [prevCoins, setPrevCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoins = coins.filter((coin) =>
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update", (data) => {
      setCoins(data);
      updatePrevCoins(data);
    });
  }, []);

  const updatePrevCoins = (data) => {
    setPrevCoins((prev) => {
      const updatedPrevCoins = {};
      data.forEach((coin) => {
        if (prev[coin.symbol]) {
          // Update previous value
          updatedPrevCoins[coin.symbol] = prev[coin.symbol];
        } else {
          // Set previous value as current value
          updatedPrevCoins[coin.symbol] = coin.price;
        }
      });
      return updatedPrevCoins;
    });
  };
  return (
    <CoinsContext.Provider value={{ filteredCoins, setSearchTerm, prevCoins }}>
      {children}
    </CoinsContext.Provider>
  );
}
