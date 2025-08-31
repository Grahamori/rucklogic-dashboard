import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};
