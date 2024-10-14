import { IoMdSearch } from "react-icons/io";
const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 p-3 w-[50px] sm:w-[300px] rounded-full shadow-sm"
      />
      <div className="absolute top-2 right-2 border rounded-full bg-red-400 p-2">
        <IoMdSearch color="white" size={16} />
      </div>
    </div>
  );
};
export default Search;
