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
    <div className="flex justify-center text-center">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
        <Search />
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
                <td className={getPriceChange(item.symbol, item.price).class}>
                  {item.price} {getPriceChange(item.symbol, item.price).icon}
                </td>
              </tr>
            ))}
            3
          </tbody>
        </table>
      </div>
    </div>
  );
}
