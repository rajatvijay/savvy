import {
  getAllCategories,
  getTransactionsPendingCategorization,
} from "@/lib/firestore";
import { Navbar } from "@/ui/Navbar";
import { PendingCategorizationList } from "@/ui/PendingCategorizationList";
import { Empty } from "antd";

export default async function PendingCategorizations() {
  const pending = await getTransactionsPendingCategorization();
  const categories = await getAllCategories();
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar selectedTab="Pending" />
      {pending.length > 0 ? (
        <PendingCategorizationList
          transactions={pending}
          categories={categories}
        />
      ) : (
        <Empty />
      )}
    </main>
  );
}
