"use client";
import React from "react";
import Checkbox from "@/components/form/CheckBox";
import { offersWithEmojis } from "@/lib/data"; // Ensure this import is correct
import { OffersFieldProps } from "@/lib/types";

const OffersField: React.FC<OffersFieldProps> = ({
  selectedOffers,
  setSelectedOffers,
}) => {
  const handleCheckboxChange = (offerId: string) => {
    setSelectedOffers((prevSelectedOffers) =>
      prevSelectedOffers.includes(offerId)
        ? prevSelectedOffers.filter((id) => id !== offerId)
        : [...prevSelectedOffers, offerId]
    );
  };

  return (
    <div className="border p-5 rounded-lg grid sm:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-5 h-auto">
      {Object.keys(offersWithEmojis).map((offerId) => (
        <div key={offerId} className="flex justify-center items-center gap-1">
          <label htmlFor={offerId} className="block sm:text-m sm:font-bold">
            {offersWithEmojis[offerId]} {offerId}
          </label>
          <Checkbox
            id={offerId}
            checked={selectedOffers.includes(offerId)}
            onChange={() => handleCheckboxChange(offerId)}
          />
        </div>
      ))}
    </div>
  );
};

export default OffersField;
