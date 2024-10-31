"use client";
import { FaWindowClose } from "react-icons/fa";
import CheckOutForm from "./CheckOutForm";
import { FaRegWindowClose } from "react-icons/fa";

interface CheckOutProps {
  bookingDate: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  days: number;
  totalPrice: number;
  closeModal: () => void;
  bookHome: () => Promise<void>;
}

const CheckOut: React.FC<CheckOutProps> = ({
  closeModal,
  totalPrice,
  days,
  bookHome,
  bookingDate,
}) => {
  return (
    <div className="flex flex-col gap-6 p-6  rounded-xl shadow-lg relative">
      <button className="absolute top-5 right-5 " onClick={closeModal}>
        <FaRegWindowClose color="red" size={30} />
      </button>
      <div className="flex justify-between items-center text-gray-800">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Booking Details</p>
          <p>
            Check in Date:{" "}
            <span className="font-bold">
              {bookingDate.startDate.toLocaleDateString()}
            </span>
          </p>
          <p>
            Check Out Date:{" "}
            <span className="font-bold">
              {bookingDate.endDate.toLocaleDateString()}
            </span>
          </p>
          <p>
            Nights: <span className="font-bold">{days}</span>
          </p>
          <p>
            Total Price: <span className="font-bold">${totalPrice}</span>
          </p>
        </div>
      </div>
      <CheckOutForm bookHome={bookHome} />
    </div>
  );
};

export default CheckOut;
