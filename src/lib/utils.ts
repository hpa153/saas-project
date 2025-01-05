import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

import { db } from "@/db";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const toCapitalizedString = (str: string) => {
  str = str.charAt(0).toUpperCase() + str.slice(1);

  for (let x = 1; x < str.length; x++) {
    if (str.charAt(x) >= "A" && str.charAt(x) <= "Z") {
      str = str.slice(0, x) + " " + str.slice(x);
      x++;
    }
  }

  return str;
};

const parseColor = (color: string) => {
  const hex = color.startsWith("#") ? color.slice(1) : color;
  return parseInt(hex, 16);
};

const validateUser = async (authHeader: string | null) => {
  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Invalid auth header format!" },
      { status: 401 }
    );
  }

  const apiKey = authHeader.split(" ")[1];

  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ message: "Invalid API Key!" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { apiKey },
    include: { EventCategories: true },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid API Key!" }, { status: 401 });
  }

  if (!user.discordId) {
    return NextResponse.json(
      {
        message: "Please enter your discord ID in your account settings",
      },
      { status: 403 }
    );
  }

  return user;
};

export { cn, toCapitalizedString, parseColor, validateUser };
