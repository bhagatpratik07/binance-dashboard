import { useCoins } from "../contexts/CoinsContext";
import Search from "./Search";

export default function Coin() {
  const { filteredCoins, prevCoins } = useCoins();

  const getPriceChange = (symbol, price) => {
    const prevPrice = prevCoins[symbol];
    if (price > prevPrice) {
      return {
        class: "bg-green-300 rounded text-green-800 me-2  py-6 px-32",
        icon: "🔼",
      };
    } else if (price < prevPrice) {
      return {
        class: "bg-red-300 rounded text-red-800 font-medium me-2 py-6 px-32",
        icon: "🔽",
      };
    } else {
      return { class: "text-white py-6 px-32", icon: "" };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="w-full max-w-4xl">
        <Search />
        <div className="overflow-x-auto relative shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-16">
                  Symbol
                </th>
                <th scope="col" className="py-3 px-32">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((item) => (
                <tr
                  key={item.symbol}
                  className="bg-white border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-16 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.symbol}
                  </td>
                  <td className={getPriceChange(item.symbol, item.price).class}>
                    {item.price} {getPriceChange(item.symbol, item.price).icon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
