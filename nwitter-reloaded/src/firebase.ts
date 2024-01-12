
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAog91Ym21dhoxsA9KZpUzWi0IXikiND9A",
  authDomain: "nwitter-reloaded-7ea20.firebaseapp.com",
  projectId: "nwitter-reloaded-7ea20",
  storageBucket: "nwitter-reloaded-7ea20.appspot.com",
  messagingSenderId: "284317618759",
  appId: "1:284317618759:web:c49df3dfeb8e9525a51762"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const db = getFirestore(app)

