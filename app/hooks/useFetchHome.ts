import { useState, useEffect, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Home } from "@/lib/types";
import { toast } from "react-hot-toast";

const useFetchHome = (id: string) => {
  const [home, setHome] = useState<Home | null>(null);

  const fetchHome = useCallback(async () => {
    try {
      const docRef = doc(db, "homes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setHome({ id: docSnap.id, ...docSnap.data() } as Home);
      } else {
        toast.error("Document not found");
      }
    } catch (error) {
      toast.error("Error fetching home");
      console.error("Error fetching home", error);
    }
  }, [id]);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  return home;
};

export default useFetchHome;
