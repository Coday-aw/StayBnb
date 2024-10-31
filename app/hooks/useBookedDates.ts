import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const fetchBookedDates = async (homeId: string) => {
  const q = query(collection(db, "bookings"), where("homeId", "==", homeId));
  const querySnapshot = await getDocs(q);
  const bookedDates: Date[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const startDate = data.startDate.toDate();
    const endDate = data.endDate.toDate();

    let currentDate = startDate;
    while (currentDate <= endDate) {
      bookedDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return bookedDates;
};

export default fetchBookedDates;
