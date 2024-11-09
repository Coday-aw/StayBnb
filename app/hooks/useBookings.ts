import { useState, useEffect } from "react";
import { query, collection, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home } from "@/lib/types";

interface Booking extends Home {
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

const fetchBookings = async (userId: string): Promise<Booking[]> => {
  const q = query(collection(db, "bookings"), where("userId", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    const querySnapshotData = querySnapshot.docs.map((doc) => doc.data());

    const homePromises = querySnapshotData.map(async (booking) => {
      const homeId = booking.homeId;
      const homeDocRef = doc(db, "homes", homeId);
      const homeDoc = await getDoc(homeDocRef);
      const homeData = homeDoc.data();
      return {
        id: homeDoc.id,
        ...(homeData && typeof homeData === "object" ? homeData : {}),
        startDate: booking.startDate.toDate(),
        endDate: booking.endDate.toDate(),
        totalPrice: booking.totalPrice,
      } as Booking;
    });
    const bookings = await Promise.all(homePromises);

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings", error);
    return [];
  }
};

const useBookings = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      if (userId) {
        const userBookings = await fetchBookings(userId);
        setBookings(userBookings);
      }
      setLoading(false);
    };

    loadBookings();
  }, [userId]);

  return { bookings, loading };
};

export default useBookings;