"use client";
import React from "react";
import Checkbox from "@/components/form/CheckBox";
import { offers } from "@/lib/data"; // Ensure this import is correct
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
    <div className="border p-5 rounded-lg grid grid-cols-2 sm:grid-cols-3 gap-5 h-auto">
      {Object.keys(offers).map((offerId) => (
        <div key={offerId} className="flex justify-center items-center gap-1">
          <label
            htmlFor={offerId}
            className="block sm:text-m font-bold text-sm"
          >
            {offers[offerId]} {offerId}
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
