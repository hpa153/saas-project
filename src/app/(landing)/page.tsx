import { Check, Star } from "lucide-react";

import Heading from "@/components/Heading";
import PageWrapper from "@/components/PageWrapper";
import { ads } from "@/constants";
import { ShinyButton } from "@/components/ShinyButton";

export default function Home() {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <PageWrapper className="text-center">
          <div className="flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Realtime SaaS Insights</span>
                <br />
                <span className="capitalize bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  delivered to your discord
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              Saas Pro is the easiest way to monitor your SaaS. Get instant
              notifications for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              sent directly to your Discord.
            </p>

            <ul className="space-y-2 text-base/7 text-gray-600 text-left items-start">
              {ads.map((item, idx) => (
                <li key={idx} className="flex gap-1.5 items-center">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </PageWrapper>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </>
  );
}
