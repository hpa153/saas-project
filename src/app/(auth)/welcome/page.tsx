"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import BackgroundPattern from "@/components/BackgroundPattern";
import { client } from "@/server/client";

const Welcome = () => {
  const router = useRouter();

  // Sync user from clerk to db
  const { data } = useQuery({
    queryFn: async () => {
      const res = await client.auth.getDatabaseSyncStatus.$get();

      return await res.json();
    },
    queryKey: ["get-database-sync-status"],
    refetchInterval: (query) => {
      return query.state.data?.isSynced ? false : 1000;
    },
  });

  useEffect(() => {
    if (data?.isSynced) router.push("/dashboard");
  }, [data, router]);

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4">
      <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />

      <div className="relative z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-center">
        <LoadingSpinner size="md" />
        <Heading>Creating your account...</Heading>
        <p className="text-base/7 text-gray-600 max-w-prose">
          Just a moment while we set things up for you.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
