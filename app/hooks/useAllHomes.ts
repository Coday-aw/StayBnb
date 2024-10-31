import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Home } from '@/lib/types';
import {toast} from "react-hot-toast"


export const useFetchHomes = () => {
const [homes, setHomes] = useState<Home[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);


useEffect(() => {
    const fetchHomes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'homes'));
            const fetchedHomes = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Home[];
            setHomes(fetchedHomes)
            console.log(fetchedHomes);
        } catch (error) {
            setError('Error fetching homes');
            toast.error("Error fetching homes");
        } finally {
            setLoading(false);
        }
    };

    fetchHomes();
}, []);
return { homes, loading, error};
}