import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { db } from "@/db";
import DashboardPage from "@/components/dashboard/DashboardPage";
import CategoryPageContent from "@/components/category/CategoryPageContent";
import { toCapitalizedString } from "@/lib/utils";

// Fixed PageProps constraint issue
interface CategoryPageProps {
  params: Promise<{
    name: string | string[] | undefined;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { name } = await params;

  if (typeof name !== "string") return notFound();

  const auth = await currentUser();

  if (!auth) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    return notFound();
  }

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  const hasEvents = category._count.events > 0;

  return (
    <DashboardPage
      title={`${category.emoji} ${toCapitalizedString(category.name)} events`}
    >
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  );
};

export default CategoryPage;
