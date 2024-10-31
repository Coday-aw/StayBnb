import { IoMdSearch } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import { useFetchHomes } from "@/app/hooks/useAllHomes";
import { useState } from "react";
import { fi } from "date-fns/locale";
const Search = () => {
  const homes = useFetchHomes();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const filtedHomes = homes.homes.filter((home) => {
    return home.location.country.toLowerCase().includes(search.toLowerCase());
  });

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="relative hidden sm:block">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        className="border border-gray-300 p-3 w-[150px] sm:w-[300px] rounded-full shadow-sm"
      />
      <div className="absolute top-2 right-2 border rounded-full bg-red-400 p-2">
        <IoMdSearch color="white" size={16} />
      </div>
    </div>
  );
};
export default Search;
