import Button from "@/components/Button";

interface CheckOutFormProps {
  bookHome: () => Promise<void>;
}

const CheckOutForm = ({ bookHome }: CheckOutFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        bookHome();
      }}
      className="border flex flex-col p-5 gap-4 rounded-xl"
    >
      <p className="text-lg font-semibold text-gray-800">Credit Card Details</p>
      <div className="flex justify-between items-center gap-4">
        <label className="w-1/3 text-gray-800">Payment Method</label>
        <select required className="w-2/3 p-2 border rounded-lg">
          <option>Visa</option>
          <option>Mastercard</option>
          <option>American Express</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 0">
        <label className="text-gray-800">Name on Card</label>
        <input
          required
          type="text"
          placeholder="Full Name"
          className="p-2 border rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-800">Card Number</label>
        <input
          required
          type="text"
          placeholder="0000 0000 0000 0000"
          pattern="\d{4} \d{4} \d{4} \d{4}"
          className="p-2 border rounded-lg"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid card number in the format 0000 0000 0000 0000"
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-800">Expiration Date</label>
          <input
            required
            type="text"
            placeholder="MM"
            pattern="\d{2}"
            className="p-2 border rounded-lg"
            onInvalid={(e) =>
              (e.target as HTMLInputElement).setCustomValidity(
                "Please enter a valid month in the format MM"
              )
            }
            onInput={(e) =>
              (e.target as HTMLInputElement).setCustomValidity("")
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-gray-800">Year</label>
          <input
            required
            type="text"
            placeholder="YYYY"
            pattern="\d{4}"
            className="p-2 border rounded-lg"
            onInvalid={(e) =>
              (e.target as HTMLInputElement).setCustomValidity(
                "Please enter a valid year in the format YYYY"
              )
            }
            onInput={(e) =>
              (e.target as HTMLInputElement).setCustomValidity("")
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-800">CVV</label>
        <input
          required
          type="text"
          placeholder="000"
          pattern="\d{3}"
          className="p-2 border rounded-lg"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid CVV in the format 000"
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        />
      </div>
      <Button type="submit">Confirm Booking</Button>
    </form>
  );
};

export default CheckOutForm;
