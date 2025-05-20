import { Lato, Caveat } from "next/font/google";

export const lato = Lato({
  subsets: ["latin"],
  variable: "--lato",
  weight: ["100", "900"],
});

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--caveat",
  weight: ["400"],
});
