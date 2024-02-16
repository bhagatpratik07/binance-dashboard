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

  const getPriceChange = (symbol, price) => {
    const prevPrice = prevCoins[symbol];
    if (price > prevPrice) {
      return { color: "green", icon: "🔼" };
    } else if (price < prevPrice) {
      return { color: "red", icon: "🔽" };
    } else {
      return { color: "white", icon: "" };
    }
  };

  return (
    <div className="flex justify-center text-center">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs ">
            <tr>
              <th scope="col" className="py-6 px-32">
                Symbol
              </th>
              <th scope="col" className="py-6 px-32">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((item) => (
              <tr key={item.symbol} className=" border-b ">
                <th
                  scope="row"
                  className="py-6 px-32 font-medium whitespace-nowrap"
                >
                  {item.symbol}
                </th>
                <td
                  className="py-6 px-32"
                  style={{
                    color: getPriceChange(item.symbol, item.price).color,
                  }}
                >
                  {item.price} {getPriceChange(item.symbol, item.price).icon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//  <h4 style={{ color: getColor(coin.symbol, coin.price) }}>
