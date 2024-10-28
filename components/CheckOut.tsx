"use client";
import { FaWindowClose } from "react-icons/fa";
import Button from "@/components/Button";

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
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg relative">
      <button
        className="absolute top-5 right-5 hover:text-red-500"
        onClick={closeModal}
      >
        <FaWindowClose size={30} />
      </button>
      <div className="flex justify-between items-center">
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          bookHome();
        }}
        className="border flex flex-col p-5 gap-4 bg-gray-50 rounded-lg"
      >
        <p className="text-lg font-semibold">Credit Card Details</p>
        <div className="flex justify-between items-center gap-4">
          <label className="w-1/3">Payment Method</label>
          <select required className="w-2/3 p-2 border rounded-lg">
            <option>Visa</option>
            <option>Mastercard</option>
            <option>Paypal</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Name on Card</label>
          <input
            required
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Card Number</label>
          <input
            required
            type="number"
            placeholder="0000 0000 0000 0000"
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Expiration Date</label>
            <input
              required
              type="number"
              placeholder="MM"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label>Year</label>
            <input
              required
              type="number"
              placeholder="YYYY"
              className="p-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>CVV</label>
          <input
            required
            type="number"
            placeholder="000"
            className="p-2 border rounded-lg"
          />
        </div>
        <Button type="submit">Confirm Booking</Button>
      </form>
    </div>
  );
};

export default CheckOut;
