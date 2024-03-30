import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Category, Transaction } from "./types";
import {
  CATEGORIES_COLLECTION_NAME,
  TRANSACTIONS_COLLECTION_NAME,
} from "./firebaseConstants";

export async function getTransactionsPendingCategorization(): Promise<
  Transaction[]
> {
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

export async function getAllCategories(): Promise<Category[]> {
  const q = query(collection(db, CATEGORIES_COLLECTION_NAME));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Category[];
}

export async function categorizeTransaction({
  transactionId,
  outflow,
  expenseHead,
  comments,
}: {
  transactionId: string;
  outflow: Transaction["outflow"];
  expenseHead: Transaction["expenseHead"];
  comments: Transaction["comments"];
}) {
  await setDoc(
    doc(db, TRANSACTIONS_COLLECTION_NAME, transactionId),
    {
      outflow,
      expenseHead,
      comments,
    },
    { merge: true }
  );
}
