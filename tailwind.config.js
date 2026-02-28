/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "#000000",
                foreground: "#ffffff",
                primary: {
                    DEFAULT: "#D4A52C",
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Custom Gold Palette from index.css
                gold: {
                    100: "#F9F1D8",
                    200: "#F0DEAA",
                    300: "#E6CB7D",
                    400: "#DDB853",
                    500: "#D4A52C",
                    600: "#AA8423",
                    700: "#80631B",
                    800: "#554212",
                    900: "#2B2109",
                    950: "#1a1305",
                },
                dark: {
                    950: "#0a0a0a",
                    900: "#171717",
                    850: "#262626",
                }
            },
        },
    },
    plugins: [],
}
