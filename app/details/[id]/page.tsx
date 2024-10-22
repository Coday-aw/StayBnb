"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home } from "@/lib/types";
import { toast, Toaster } from "react-hot-toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import { RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { offersWithEmojis } from "@/lib/data";

interface Params {
  id: string;
}

function DetailsPage({ params }: { params: Params }) {
  const [home, setHome] = useState<Home | null>(null);
  const [bookingDate, setBookingDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleBookingDate = (ranges: RangeKeyDict) => {
    setBookingDate({
      startDate: ranges.selection.startDate || new Date(),
      endDate: ranges.selection.endDate || new Date(),
      key: "selection",
    });
  };

  const fetchHome = async () => {
    try {
      const docRef = doc(db, "homes", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setHome(docSnap.data() as Home);
      } else {
        toast.error("document not found");
      }
    } catch (error) {
      toast.error("Error fetching home");
      console.error("Error fetching home", error);
    }
  };

  useEffect(() => {
    fetchHome();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <Toaster position="top-center" />
      <div className="flex flex-col gap-5 mt-5">
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
        <div className="flex gap-10 flex-col sm:flex-row">
          <div>
            <p>hosted by steve</p>
            <p className="text-slate-400">
              {home?.guests} Guests, {home?.rooms} Rooms, {home?.bathrooms}{" "}
              Bathrooms
            </p>
            <hr className="mt-5" />
            <p className="py-5">{home?.description}</p>
            <hr />
            <p>What this place offers</p>
            <ul className="grid grid-cols-2 lg:grid-cols-4  md:grid-cols-2 gap-1">
              {home?.offers.map((offer) => (
                <li className="flex gap-1" key={offer}>
                  {offersWithEmojis[offer]}
                  <p>{offer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start p-2 gap-5 ">
            <p>
              {" "}
              <span className="text-3xl font-bold">${home?.price}</span> /night
            </p>
            <DateRange
              minDate={new Date()}
              ranges={[bookingDate]}
              onChange={handleBookingDate}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default DetailsPage;
