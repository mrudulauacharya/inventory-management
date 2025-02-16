import { db, auth } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where } from "firebase/firestore";

// Get user-specific inventory collection
const getUserInventoryCollection = () => {
  const user = auth.currentUser;
  if (!user) return null;
  return collection(db, "users", user.uid, "inventory");
};

// Add Item (Specific to User)
export const addItem = async (item) => {
  try {
    const inventoryCollection = getUserInventoryCollection();
    if (!inventoryCollection) throw new Error("User not logged in");
    await addDoc(inventoryCollection, item);
    console.log("Item added:", item);
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// Listen to User-Specific Inventory
export const listenToInventory = (callback) => {
  const inventoryCollection = getUserInventoryCollection();
  if (!inventoryCollection) return;

  return onSnapshot(inventoryCollection, (snapshot) => {
    const updatedItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(updatedItems);
  });
};

// Delete Item
export const deleteItem = async (id) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    await deleteDoc(doc(db, "users", user.uid, "inventory", id));
    console.log("Item deleted:", id);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Update Item
export const updateItem = async (id, updatedItem) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    await updateDoc(doc(db, "users", user.uid, "inventory", id), updatedItem);
    console.log("Item updated:", updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};
