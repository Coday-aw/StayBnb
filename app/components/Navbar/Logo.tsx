import { PiWarehouseLight } from "react-icons/pi";

const Logo = () => {
  return (
    <div className="hidden sm:flex justify-center items-center">
      <div>
        <PiWarehouseLight size={40} color="red" />
      </div>
      <p className="hidden lg:block font-bold text-[#FF385C]">StayBnb</p>
    </div>
  );
};
export default Logo;
