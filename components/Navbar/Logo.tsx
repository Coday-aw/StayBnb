import Link from "next/link";
import { PiWarehouseLight } from "react-icons/pi";

const Logo = () => {
  return (
    <Link href="/" className="hidden sm:flex justify-center items-center">
      <div className="text-[#FF385C]">
        <PiWarehouseLight size={40} />
      </div>
      <p className="hidden lg:block font-bold text-[#FF385C]">StayBnb</p>
    </Link>
  );
};
export default Logo;
