import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Coin() {
  const [coins, setCoins] = useState([]);
  const [prevCoins, setPrevCoins] = useState({});

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

  const getColor = (symbol, price) => {
    const prevPrice = prevCoins[symbol];
    return price > prevPrice ? "green" : price < prevPrice ? "red" : "black";
  };

  return (
    <div>
      <div>
        {coins.map((coin) => (
          <div key={coin.symbol}>
            <h3>{coin.symbol}</h3>
            <h4 style={{ color: getColor(coin.symbol, coin.price) }}>
              {coin.price}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
