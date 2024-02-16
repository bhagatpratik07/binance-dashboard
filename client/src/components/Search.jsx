import { useCoins } from "../contexts/CoinsContext";

export default function Search() {
  const { setSearchTerm } = useCoins();

  return (
    <div className="mb-4 max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a coin..."
          className="px-4 py-2 w-full border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors text-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="w-5 h-5 absolute right-3 top-3 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
  );
}
