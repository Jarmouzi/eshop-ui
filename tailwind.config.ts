import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|checkbox|listbox|slider|toggle|tabs|ripple|divider|popover).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              100: "#f8d8de",
              200: "#f8dfe3",
              300: "#d82c33",
              400: "#cc2229",
              500: "#bd191f",
              600: "#a72c31",
              700: "#951f24",
              800: "#a00a0f",
              900: "#930409",
              DEFAULT: "#B01116",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              100: "#f94b52",
              200: "#e73940",
              300: "#d82c33",
              400: "#cc2229",
              500: "#bd191f",
              600: "#a72c31",
              700: "#951f24",
              800: "#a00a0f",
              900: "#930409",
              DEFAULT: "#B01116",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
