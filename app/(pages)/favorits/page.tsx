"use client";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import HomeCard from "@/components/HomeCard";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FavoritsPage() {
  const [favoritHomes, setFavoritsHomes] = useState<Home[]>([]);
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  const fetchFavoritsHomes = async () => {
    try {
      if (!user?.id || !isLoaded) {
        console.log("User not logged in");
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "favorits"),
        where("userId", "==", user.id)
      );

      const querySnapshot = await getDocs(q);
      const homePromises = querySnapshot.docs.map(async (favoritDoc) => {
        const homeId = favoritDoc.data().homeId;
        const homeDocRef = doc(db, "homes", homeId);
        const homeDoc = await getDoc(homeDocRef);
        const homeData = homeDoc.data();
        return {
          id: homeDoc.id,
          ...(homeData && typeof homeData === "object" ? homeData : {}),
        } as Home;
      });
      const fetchedHomes = await Promise.all(homePromises);
      setFavoritsHomes(fetchedHomes);
      console.log(fetchedHomes);
    } catch (error) {
      console.error("Error fetching favorits homes", error);
      toast.error("Error fetching favorits homes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritsHomes();
  }, [user, isLoaded]);

  return (
    <Container>
      <Toaster />

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
      ) : favoritHomes.length === 0 ? (
        <p className="text-center">No favorits homes found</p>
      ) : (
        <div className="flex justify-center items-center flex-col gap-5 p-10">
          <Heading>Your Favorits</Heading>
          <div className="flex gap-4 flex-wrap">
            {favoritHomes.map((home) => (
              <HomeCard key={home.id} home={home} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

export default FavoritsPage;
