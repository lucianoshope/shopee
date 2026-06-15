import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // paleta inspirada na Shopee (laranja característico)
        brand: {
          DEFAULT: "#ee4d2d",
          dark: "#d73211",
          light: "#fbebe7",
          50: "#fff5f1",
        },
      },
      boxShadow: {
        card: "0 1px 10px 0 rgba(0,0,0,0.05)",
        cardhover: "0 4px 16px 0 rgba(0,0,0,0.12)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
