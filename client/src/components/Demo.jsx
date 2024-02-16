import { useState } from "react";
import data from "../sampleCoins.json";

export default function Demo() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoins = data.filter((coin) =>
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex justify-center text-center">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a coin..."
            className="px-4 py-2 rounded shadow text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
            {filteredCoins.map((item) => (
              <tr key={item.symbol} className=" border-b ">
                <th
                  scope="row"
                  className="py-6 px-32 font-medium whitespace-nowrap"
                >
                  {item.symbol}
                </th>
                <td className="py-6 px-32">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
