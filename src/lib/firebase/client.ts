import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfKt0kb2YnkOpSreyFy4VppPshomQoWzs",
  authDomain: "user-counter-6f6bc.firebaseapp.com",
  projectId: "user-counter-6f6bc",
  storageBucket: "user-counter-6f6bc.firebasestorage.app",
  messagingSenderId: "506056197460",
  appId: "1:506056197460:web:f621eec179e2601da5f4c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

export { db, auth, provider }
