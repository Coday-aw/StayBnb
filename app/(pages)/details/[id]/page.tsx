"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home } from "@/lib/types";
import { toast, Toaster } from "react-hot-toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import { RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { offers } from "@/lib/data";
import Button from "@/components/Button";

interface Params {
  id: string;
}

function DetailsPage({ params }: { params: Params }) {
  const [home, setHome] = useState<Home | null>(null);
  const [days, setDays] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleBookingDate = useCallback((ranges: RangeKeyDict) => {
    setBookingDate({
      startDate: ranges.selection.startDate || new Date(),
      endDate: ranges.selection.endDate || new Date(),
      key: "selection",
    });
  }, []);

  const calculateTotalDays = useCallback(() => {
    const { startDate, endDate } = bookingDate;
    if (!startDate || !endDate) return 0;
    const totalDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    setDays(totalDays);
    return totalDays;
  }, [bookingDate]);

  const calculateTotalPrice = useCallback(() => {
    const totalDays = calculateTotalDays();
    const pricePerNight = home?.price ?? 0;
    const totalPrice = totalDays * Number(pricePerNight);
    setTotalPrice(totalPrice);
  }, [calculateTotalDays, home?.price]);

  useEffect(() => {
    calculateTotalPrice();
  }, [bookingDate, home, calculateTotalPrice]);

  const fetchHome = useCallback(async () => {
    try {
      const docRef = doc(db, "homes", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setHome(docSnap.data() as Home);
      } else {
        toast.error("Document not found");
      }
    } catch (error) {
      toast.error("Error fetching home");
      console.error("Error fetching home", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchHome();
  }, [params.id, fetchHome]);

  return (
    <Container>
      <Navbar />
      <Toaster position="top-center" />
      <div className="flex flex-col gap-5 mt-5 lg:p-10">
        <p className="text-3xl font-bold">
          {capitalizeFirstLetter(home?.title ?? "")}
        </p>
        <div className="sm:h-[400px] w-full mb-10">
          {typeof home?.image === "string" && home?.image && (
            <img
              className="h-full w-full object-cover rounded-lg"
              src={home.image}
              alt={home.title}
            />
          )}
        </div>
        <div className="flex gap-10 flex-col md:flex-row">
          <div className="flex-1">
            <p>Hosted by {home?.creator}</p>
            <p className="text-slate-400">
              {home?.guests} Guests, {home?.rooms} Rooms, {home?.bathrooms}{" "}
              Bathrooms
            </p>
            <hr className="mt-5" />
            <p className="py-5">{home?.description}</p>
            <hr />
            <p className="sm:text-2xl lg:text-3xl font-bold mb-5 mt-10">
              What this place offers
            </p>
            <ul className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-2 gap-1">
              {home?.offers.map((offer) => (
                <li className="flex gap-1" key={offer}>
                  {offers[offer]}
                  <p>{offer}</p>
                </li>
              ))}
            </ul>
            <div className=""></div>
          </div>

          <div className="flex flex-col justify-center items-center border p-2">
            <p>
              {" "}
              <span className="text-3xl font-bold">${home?.price}</span> /night
            </p>
            <DateRange
              minDate={new Date()}
              ranges={[bookingDate]}
              onChange={handleBookingDate}
            />
            <Button width={20}>Reservera</Button>
            <p>
              {" "}
              Nights: <span className="font-bold">{days}</span>
            </p>
            <p className="mt-5 text-2xl">
              Total Price: <span className="font-bold">${totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DetailsPage;
