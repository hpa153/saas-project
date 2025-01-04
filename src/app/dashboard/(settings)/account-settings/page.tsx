import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/db";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AccountSettings from "@/components/settings/AccountSettings";

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
    <DashboardPage title="Account Settings">
      <AccountSettings discordId={user.discordId ?? ""} />
    </DashboardPage>
  );
};

export default UpgradePage;
