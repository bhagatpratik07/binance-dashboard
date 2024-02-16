import data from "../sampleCoins.json";

export default function Demo() {
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
            {data.map((item) => (
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
