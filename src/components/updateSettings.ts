import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";

export const updateSettings = async (name: string, email: string, memory: string, image: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const docRef = doc(db, 'users', userId);
    try {
        await updateDoc(docRef, {
            name: name,
            email: email,
            memory: memory,
            image: image
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
