import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Transaction } from "./types";

export async function getTransactionsPendingCategorization() {
  const q = query(
    collection(db, "testTransactions"),
    where("outflow", "==", null)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Transaction[];
}
