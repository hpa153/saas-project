import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { UpgradePageContent } from "@/components/upgrade/UpgradePageContent";
import { db } from "@/db";

const UpgradePage = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <DashboardPage title="Pro Membership">
      <UpgradePageContent plan={user.plan} />
    </DashboardPage>
  );
};

export default UpgradePage;
