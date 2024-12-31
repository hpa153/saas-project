import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export { cn, toCapitalizedString, parseColor };
