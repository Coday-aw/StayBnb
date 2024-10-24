import { Home } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
interface HomeCardProps {
  home: Home;
}

const HomeCard: React.FC<HomeCardProps> = ({ home }) => {
  const { city, country } = home.location;
  return (
    <div className="mx-auto">
      <div className=" relative">
        <Link href={`/details/${home.id}`}>
          {typeof home.image === "string" && home.image && (
            <img
              src={home.image}
              alt={home.title}
              className="  w-[400px] h-[300px]  sm:w-[300px] sm:h-[200px] md:w-[250px] md:h-[300px] cursor-pointer rounded-lg object-cover hover:border-4 hover:border-white"
            />
          )}
        </Link>
        <button className=" absolute top-2 right-2">
          <FaHeart color="red" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-m font-semibold mt-2">
          {capitalizeFirstLetter(city)}, {capitalizeFirstLetter(country)}
        </p>
        <p className="text-m text-gray-400">{home.category}</p>
        <p className="text-m">
          {" "}
          <span className="font-bold">${home.price}</span> night
        </p>
      </div>
    </div>
  );
};
export default HomeCard;
