import { Home } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  query,
  deleteDoc,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

interface HomeCardProps {
  home: Home;
}

const HomeCard: React.FC<HomeCardProps> = ({ home }) => {
  const { city = "", country = "" } = home.location || {};
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const q = query(
          collection(db, "favorits"),
          where("homeId", "==", home.id),
          where("userId", "==", user.id)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsLiked(true);
        }
      }
    };

    checkIfLiked();
  }, [home.id, user]);

  const handleLike = async () => {
    try {
      if (!user) {
        console.log("User not logged in");
        toast.error("Please login to like a home");
        return;
      }

      const q = query(
        collection(db, "favorits"),
        where("homeId", "==", home.id),
        where("userId", "==", user.id)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(db, "favorits", docId));
        toast.success("Home removed from favorites");
        setIsLiked(false);
      } else {
        const docRef = await addDoc(collection(db, "favorits"), {
          userId: user.id,
          homeId: home.id,
        });
        toast.success("Home added to favorites");
        console.log("Document written with ID: ", docRef.id);
        setIsLiked(true);
      }
    } catch (error) {
      toast.error("Failed to update favorites");
      console.error("Error updating favorites", error);
    }
  };

  return (
    <div className="mx-auto">
      <div className="relative">
        <Link href={`/details/${home.id}`}>
          {typeof home.image === "string" && home.image && (
            <img
              src={home.image}
              alt={home.title}
              className="w-[400px] h-[300px] sm:w-[300px] sm:h-[200px] md:w-[250px] md:h-[300px] cursor-pointer rounded-xl object-cover hover:border-4 hover:border-white"
            />
          )}
        </Link>
        <button onClick={handleLike} className="absolute top-2 right-2">
          <FaHeart color={isLiked ? "red" : "white"} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-m font-semibold mt-2">
          {capitalizeFirstLetter(city)}, {capitalizeFirstLetter(country)}
        </p>
        <p className="text-m text-gray-400">{home.category}</p>
        <p className="text-m">
          <span className="font-bold">${home.price}</span> night
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
