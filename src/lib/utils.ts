import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toCapitalizedString = (str: string) => {
  str = str.charAt(0).toUpperCase() + str.slice(1);

  for (let x = 1; x < str.length; x++) {
    if (str.charAt(x) >= "A" && str.charAt(x) <= "Z") {
      str = str.slice(0, x) + " " + str.slice(x);
      x++;
    }
  }

  return str;
};
