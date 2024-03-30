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
  TRANSACTIONS_COLLECTION_NAME_DEV,
  TRANSACTIONS_COLLECTION_NAME_PROD,
} from "../utils/constants";
import { isProdEnv } from "@/utils/env";

const TRANSACTIONS_COLLECTION_NAME = isProdEnv()
  ? TRANSACTIONS_COLLECTION_NAME_PROD
  : TRANSACTIONS_COLLECTION_NAME_DEV;

export async function getTransactionsPendingCategorization(): Promise<
  Transaction[]
> {
  const q = query(
    collection(db, TRANSACTIONS_COLLECTION_NAME),
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
