import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/nextjs/pages/**/*.{js,ts,jsx,tsx}",
    "./src/nextjs/components/**/*.{js,ts,jsx,tsx}",
    "./src/nextjs/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
