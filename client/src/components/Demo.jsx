import { useState } from "react";
import data from "../sampleCoins.json";
import Search from "./Search";

export default function Demo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredCoins = data
    .sort((a, b) => {
      // Convert prices to numbers for comparison
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      if (sortDirection === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    })
    .filter((coin) =>
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="w-full max-w-4xl">
        <Search />
        <div className="overflow-x-auto relative shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Symbol
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 cursor-pointer"
                  onClick={toggleSortDirection}
                >
                  Price {sortDirection === "asc" ? "🔼" : "🔽"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((item) => (
                <tr
                  key={item.symbol}
                  className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.symbol}
                  </td>
                  <td className="">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
