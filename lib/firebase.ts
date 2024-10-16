
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPmoyiEmaay_k-3oCs2PBqupTjmVgE4Xo",
  authDomain: "staybnb-a83a0.firebaseapp.com",
  projectId: "staybnb-a83a0",
  storageBucket: "staybnb-a83a0.appspot.com",
  messagingSenderId: "849107396511",
  appId: "1:849107396511:web:9baab2b6683fb810bbbfaa",
  measurementId: "G-7BXN8QPEWS"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

