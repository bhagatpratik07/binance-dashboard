import { useCoins } from "../contexts/CoinsContext";

export default function Search() {
  const { setSearchTerm } = useCoins();

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a coin..."
        className="px-4 py-2 rounded shadow text-black"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
