import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import DashboardPage from "@/components/dashboard/DashboardPage";
import ApiKeySettings from "@/components/settings/APIKeySettings";
import { db } from "@/db";

const APIKeyPage = async () => {
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
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  );
};

export default APIKeyPage;
