import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import { app } from "./firebase"; // ✅ not default



export const db = getFirestore(app);

// ✅ Save a new flip with ID written into the document
export const saveFlip = async (userId, flipData) => {
  const flipsRef = collection(db, "users", userId, "flips");
  const newDocRef = doc(flipsRef); // Auto-generates a unique ID

  const flipWithId = {
    ...flipData,
    id: newDocRef.id, // ✅ Inject the ID directly
    timestamp: serverTimestamp()
  };

  await setDoc(newDocRef, flipWithId);

  return newDocRef.id;
};


// ✅ Get all flips for a user
export const getFlips = async (userId) => {
  const userRef = doc(collection(db, "users"), userId);
  const flipsRef = collection(userRef, "flips");
  const snapshot = await getDocs(flipsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// ✅ Delete a flip by ID
export const deleteFlip = async (userId, flipId) => {
  const flipRef = doc(db, "users", userId, "flips", flipId);
  await deleteDoc(flipRef);
};

// ✅ Update an existing flip
export const updateFlip = async (userId, flipId, updatedData) => {
  const flipRef = doc(db, "users", userId, "flips", flipId);
  await updateDoc(flipRef, {
    ...updatedData,
    updatedAt: serverTimestamp()
  });
};

// Save a new description
export const saveDescription = async (userId, descriptionData) => {
  const descRef = collection(db, "users", userId, "descriptions");
  const docRef = await addDoc(descRef, {
    ...descriptionData,
    timestamp: serverTimestamp()
  });
  await updateDoc(docRef, { id: docRef.id }); // ✅ Inject ID
  return docRef.id;
};

// Get all descriptions
export const getDescriptions = async (userId) => {
  const descRef = collection(db, "users", userId, "descriptions");
  const snapshot = await getDocs(descRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Delete a description
export const deleteDescription = async (userId, descId) => {
  const descRef = doc(db, "users", userId, "descriptions", descId);
  await deleteDoc(descRef);
};

// Update a description
export const updateDescription = async (userId, descId, updatedData) => {
  const descRef = doc(db, "users", userId, "descriptions", descId);
  await updateDoc(descRef, {
    ...updatedData,
    updatedAt: serverTimestamp()
  });
};

