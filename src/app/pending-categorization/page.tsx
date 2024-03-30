import { getTransactionsPendingCategorization } from "@/lib/firestore";
import { Navbar } from "@/ui/Navbar";
import { PendingCategorizationList } from "@/ui/PendingCategorizationList";

export default async function PendingCategorizations() {
  const pending = await getTransactionsPendingCategorization();
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar selectedTab="Pending" />
      <PendingCategorizationList transactions={pending} />
    </main>
  );
}
