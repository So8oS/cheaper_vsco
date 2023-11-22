/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";

module.exports = withUt({
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
});
