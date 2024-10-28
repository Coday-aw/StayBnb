"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@clerk/nextjs";
import HomeCard from "@/components/HomeCard";
import useBookings from "@/app/hooks/useBookings";

function BookingsPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { bookings, loading } = useBookings(userId || "");

  return (
    <Container>
      <Navbar />
      <div className="p-5">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <div>
            <p className="font-bold text-3xl mb-6 text-center">Your Bookings</p>
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
                    <p className="font-bold text-lg mb-1">{home.title}</p>
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
