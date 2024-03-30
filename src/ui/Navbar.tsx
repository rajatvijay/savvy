import { Affix, Segmented } from "antd";
import Link from "next/link";

type TabsOptions = "Pending" | "Overview";

export function Navbar({ selectedTab }: { selectedTab: TabsOptions }) {
  return (
    <Segmented<TabsOptions>
      size="large"
      block
      options={[
        {
          label: <Link href={"/pending-categorization"}>Pending</Link>,
          value: "Pending",
        },
        {
          label: <Link href={"/overview"}>Overview</Link>,
          value: "Overview",
        },
      ]}
      value={selectedTab}
    />
  );
}
