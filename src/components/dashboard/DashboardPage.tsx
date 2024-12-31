"use client";

import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Heading from "../Heading";

interface DashboardPageProps {
  title: string;
  children?: ReactNode;
  hideBackButton?: boolean;
  cta?: ReactNode;
}

const DashboardPage = ({
  title,
  children,
  cta,
  hideBackButton,
}: DashboardPageProps) => {
  const router = useRouter();

  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full p-6 sm:p-8 flex border-b border-gray-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-8">
            {hideBackButton ? null : (
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-fit bg-white"
                variant="outline"
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}

            <Heading>{title}</Heading>
          </div>

          {cta ? <div className="sm:flex justify-end w-full">{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  );
};

export default DashboardPage;
