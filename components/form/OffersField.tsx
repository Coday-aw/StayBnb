"use client";
import React from "react";
import Checkbox from "./CheckBox";
import { offers } from "@/lib/data";
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
      {offers.map((offer) => (
        <div key={offer.id} className="flex justify-center items-center gap-1">
          <label htmlFor={offer.id} className="block sm:text-m sm:font-bold">
            {offer.label}
          </label>
          <Checkbox
            id={offer.id}
            checked={selectedOffers.includes(offer.id)}
            onChange={() => handleCheckboxChange(offer.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default OffersField;
