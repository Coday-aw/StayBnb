"use client";
import React from "react";
import Checkbox from "./CheckBox";

const offers = [
  { id: "Pool", label: "Pool" },
  { id: "Sauna", label: "Sauna" },
  { id: "Tv", label: "Tv" },
  { id: "Air conditioning", label: "Air conditioning" },
  { id: "Balcony", label: "Balcony" },
  { id: "Parking", label: "Parking" },
  { id: "Wifi", label: "Wifi" },
  { id: "Beach access", label: "Beach access" },
];

interface OffersFieldProps {
  selectedOffers: string[];
  setSelectedOffers: React.Dispatch<React.SetStateAction<string[]>>;
}

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
    <div className="border p-4 rounded-lg grid grid-cols-4 gap-5 h-[200px]">
      {offers.map((offer) => (
        <div key={offer.id} className="flex justify-center items-center gap-1">
          <label
            htmlFor={offer.id}
            className="block text-m font-bold text-gray-700"
          >
            {offer.label}
          </label>
          <Checkbox
            name={offer.id}
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
