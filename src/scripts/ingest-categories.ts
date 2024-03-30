import { config } from "dotenv";
import path from "path";
import {
  collection,
  Firestore,
  deleteDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import chalk from "chalk";
import {
  CATEGORIES_COLLECTION_NAME,
  OTHERS_CATEGORY_LABEL,
} from "@/lib/firebaseConstants";

config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const CATEGORIES = [
  {
    label: "Monthly expenses",
    expenseHeads: [
      "Rent",
      "Groceries",
      "Electricity Bill",
      "Maid",
      "Internet Bill",
      "Petrol",
      "Eat Out",
      "Order Food",
      OTHERS_CATEGORY_LABEL,
    ],
  },
  {
    label: "Loan EMI",
    expenseHeads: [
      "Total Env POARR",
      "Godrej Park Retreat",
      "Car Loan",
      OTHERS_CATEGORY_LABEL,
    ],
  },
  {
    label: "Insurance",
    expenseHeads: ["Health Insurance", "Car Insurance", OTHERS_CATEGORY_LABEL],
  },
  {
    label: "Compulsory Investments",
    expenseHeads: ["LIC", "Mom & Dad", OTHERS_CATEGORY_LABEL],
  },
  { label: OTHERS_CATEGORY_LABEL, expenseHeads: [] },
];

async function clearExistingCategories(db: Firestore) {
  const collectionRef = collection(db, CATEGORIES_COLLECTION_NAME);
  const allDocs = await getDocs(collectionRef);
  console.log(chalk.redBright(`Found existing categories: ${allDocs.size}`));
  allDocs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}

async function main() {
  const { db } = await import("@/lib/firebase");
  console.log(chalk.yellow("Clearing existing categories"));
  await clearExistingCategories(db);
  console.log(chalk.yellow("Adding new categories"));
  const collectionRef = collection(db, CATEGORIES_COLLECTION_NAME);
  for (const category of CATEGORIES) {
    const docRef = await addDoc(collectionRef, category);
    console.log(chalk.green("Document written with ID: ", docRef.id));
  }
  process.exit(0);
}

main();
