import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageWrapperProps {
  className?: string;
  children: ReactNode;
}

const PageWrapper = ({ className, children }: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
