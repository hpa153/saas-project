import { Star } from "lucide-react";
import Image from "next/image";

import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

type CustomerReviewProps = {
  review: string;
  name: string;
  id: string;
  img: string;
  className: string;
};

const CustomerReviews = ({
  review,
  name,
  id,
  img,
  className,
}: CustomerReviewProps) => {
  return (
    <div
      className={cn(
        "flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16",
        className
      )}
    >
      <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="size-5 text-brand-600 fill-brand-600" />
        ))}
      </div>

      <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
        {review}
      </p>

      <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
        <Image
          src={img}
          className="rounded-full object-cover"
          alt="User avatar"
          width={48}
          height={48}
        />
        <div className="flex flex-col items-center sm:items-start">
          <p className="font-semibold flex items-center">
            {name}
            <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
          </p>
          <p className="text-sm text-gray-600">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
