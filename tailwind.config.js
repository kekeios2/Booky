/** @type {import('tailwindcss').Config} */
export const content = [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
];
export const theme = {
    extend: {
        screens: {
            xs: "475px", // ✅ لأنك تستخدم xs
        },
    },
};
export const plugins = [];
  