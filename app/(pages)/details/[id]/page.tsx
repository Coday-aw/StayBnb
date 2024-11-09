"use client";

import Container from "@/components/Container";
import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import { RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { offers } from "@/lib/data";
import Button from "@/components/Button";
import useFetchHome from "@/app/hooks/useHome";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import useFetchBookedDates from "@/app/hooks/useBookedDates";
import Modal from "@/components/Modal";
import { useUser } from "@clerk/nextjs";
import CheckOut from "@/components/checkOut/CheckOut";
import { CiLocationOn } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Params {
  id: string;
}

function DetailsPage({ params }: { params: Params }) {
  const home = useFetchHome(params.id);
  const [days, setDays] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openIsModal, setOpenIsModal] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const openModal = () => setOpenIsModal(true);
  const closeModal = () => setOpenIsModal(false);

  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      if (home?.id) {
        const dates = await useFetchBookedDates(home.id);
        setDisabledDates(dates);
      }
    };

    fetchDates();
  }, [home?.id]);

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

  useEffect(() => {
    const pricePerNight = home?.price ?? 0;
    setTotalPrice(calculateTotalDays() * Number(pricePerNight));
  }, [calculateTotalDays, home?.price]);

  const bookHome = async () => {
    if (!home || !home.id || !bookingDate.startDate || !bookingDate.endDate) {
      toast.error("Invalid booking details");
      return;
    }

    try {
      const newBooking = {
        homeId: home.id,
        startDate: bookingDate.startDate,
        endDate: bookingDate.endDate,
        totalPrice,
        userId: isLoaded && isSignedIn && user ? user.id : null,
      };

      const docRef = await addDoc(collection(db, "bookings"), newBooking);
      toast.success("Booking successful");
      router.push("/bookings");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding document");
    }
  };

  return (
    <Container>
      <Toaster position="top-center" />
      {home ? (
        <div className="flex flex-col gap-5 lg:p-10">
          <p className="text-3xl font-bold">
            {capitalizeFirstLetter(home?.title ?? "")}
          </p>
          <div className="text-slate-400  flex items-center">
            <CiLocationOn /> {home?.location.city}, {home?.location.country}
          </div>
          <div className="sm:h-[400px] w-full mb-10">
            {typeof home?.image === "string" && home?.image && (
              <img
                className="h-full w-full object-cover rounded-xl"
                src={home.image}
                alt={home.title}
              />
            )}
          </div>
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="flex-1">
              <p>Hosted by {home?.host}</p>
              <p className="text-slate-400">
                {home?.guests} Guests, {home?.rooms} Rooms, {home?.bathrooms}{" "}
                Bathrooms{" "}
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
            </div>
            <div className="flex flex-col justify-center items-center border p-2">
              <p>
                <span className="text-3xl font-bold">${home?.price}</span>/night
              </p>
              <DateRange
                className="mb-2 rounded-xl"
                minDate={new Date()}
                ranges={[bookingDate]}
                onChange={handleBookingDate}
                disabledDates={disabledDates}
              />
              <Button onClick={openModal} width={20}>
                Book Home
              </Button>
              <Modal isOpen={openIsModal} closeModal={closeModal}>
                <CheckOut
                  bookingDate={bookingDate}
                  days={days}
                  totalPrice={totalPrice}
                  closeModal={closeModal}
                  bookHome={bookHome}
                />
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 lg:p-10">
          <Skeleton height={40} width={300} />
          <Skeleton height={20} width={200} />
          <Skeleton height={400} width="100%" />
          <div className="flex gap-10 flex-col md:flex-row">
            <div className="flex-1">
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={100} />
              <hr className="mt-5" />
              <Skeleton height={100} width="100%" />
              <hr />
              <Skeleton height={30} width={200} />
              <ul className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-2 gap-1">
                {Array.from({ length: 8 }).map((_, index) => (
                  <li className="flex gap-1" key={index}>
                    <Skeleton height={20} width={20} />
                    <Skeleton height={20} width={100} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center border p-2">
              <Skeleton height={40} width={100} />
              <Skeleton height={300} width="100%" />
              <Skeleton height={40} width={200} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default DetailsPage;
