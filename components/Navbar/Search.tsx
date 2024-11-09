import { IoMdSearch } from "react-icons/io";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className="flex justify-center">
      <div className=" relative w-[80%] sm:w-[300px] ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search country"
          className="border border-gray-300 p-3  w-full sm:w-[300px]  rounded-full shadow-sm"
        />
        <div className="absolute top-2 right-2 border rounded-full bg-red-400 p-2">
          <IoMdSearch color="white" size={16} />
        </div>
      </div>
    </div>
  );
};
export default Search;
