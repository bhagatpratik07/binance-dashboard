import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Coin() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    socket.on("connect", console.log("connected"));
    socket.on("update", (data) => {
      setCoins(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <div>
        {coins.map((coin) => (
          <>
            <h3>{coin.symbol}</h3>
            <h4>{coin.price}</h4>
          </>
        ))}
      </div>
    </div>
  );
}
