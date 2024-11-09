"use client";

import { useUser } from "@clerk/nextjs";
import HomeCard from "@/components/HomeCard";
import useBookings from "@/app/hooks/useBookings";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BookingsPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { bookings, loading } = useBookings(userId || "");

  return (
    <Container>
      <div className="p-5">
        {loading ? (
          <div>
            <Skeleton height={40} width={200} className="mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="border p-4 shadow-lg rounded-2xl flex flex-col justify-between"
                  key={index}
                >
                  <Skeleton height={200} className="mb-5" />
                  <Skeleton height={20} width={150} className="mb-2" />
                  <Skeleton height={20} width={100} className="mb-1" />
                  <Skeleton height={20} width={100} className="mb-1" />
                  <Skeleton height={20} width={100} className="mb-1" />
                  <Skeleton height={20} width={100} className="mb-1" />
                </div>
              ))}
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-xl">You have no bookings</p>
        ) : (
          <div>
            <Heading>Your Bookings</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookings.map((home) => (
                <div
                  className="border p-4 shadow-lg rounded-2xl flex flex-col justify-between"
                  key={home.id}
                >
                  <HomeCard home={home} />
                  <hr className="mt-5 mb-2" />
                  <div className="flex flex-col">
                    <p className="font-bold text-xl mb-2">Booking Details:</p>
                    <p className="font-bold text-lg mb-1">Home: {home.title}</p>
                    <p className="mb-1">
                      <span className="font-semibold">Check-in Date:</span>{" "}
                      {home.startDate instanceof Date
                        ? home.startDate.toLocaleDateString()
                        : "Invalid date"}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Check-out Date:</span>{" "}
                      {home.endDate instanceof Date
                        ? home.endDate.toLocaleDateString()
                        : "Invalid date"}
                    </p>
                    <p className="text-green-600 font-bold mt-2">
                      Total Price: ${home.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default BookingsPage;
