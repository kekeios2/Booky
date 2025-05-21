/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    screens: {
      xs: "475px", // ✅ لأنك تستخدم xs
    },
    colors: {
      "navy-dark": "#0e1525",
      "navy-light": "#171c30",
    },
    backgroundImage: {
      noise: "url('/noise.png')",
    },
  },
};
export const plugins= [require('@tailwindcss/line-clamp')];
;
