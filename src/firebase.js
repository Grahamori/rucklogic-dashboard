import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9mTd5iespcCDF_y4KlB5mQkJjMCeZAlw",
  authDomain: "rucklogic.firebaseapp.com",
  projectId: "rucklogic",
  storageBucket: "rucklogic.firebasestorage.app",
  messagingSenderId: "744472633408",
  appId: "1:744472633408:web:490bcac893730e2ba6bfa5"
};

// ✅ First initialize the app
const app = initializeApp(firebaseConfig);

// ✅ Then get auth and set persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { app, auth };