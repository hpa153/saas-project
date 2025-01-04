import { PlusIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { createCheckoutSession } from "@/lib/stripe";

import { Button } from "@/components/ui/button";
import DashboardPage from "@/components/dashboard/DashboardPage";
import DashboardPageContent from "@/components/dashboard/DashboardContent";
import CreateEventCategoryModal from "@/components/CreateEventCategoryModal";
import { PaymentSuccessModal } from "@/components/upgrade/PaymentSuccessModal";

interface DashboardProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    return redirect("/welcome");
  }

  const { intent } = await searchParams;

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    });

    if (session.url) {
      redirect(session.url);
    }
  }

  const { success } = await searchParams;

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}

      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
        hideBackButton={true}
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
};

export default Dashboard;
