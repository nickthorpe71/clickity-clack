/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            padding: {
                "10vw": "10vw",
            },
            backgroundImage: {
                sunset: "url('images/sunset.png')",
            },
            boxShadow: {
                vignette: "inset 0 0 100px 100px rgba(0, 0, 0, 0.6)",
            },
            zIndex: {
                "game-background": "0",
                "game-midground": "1",
                "game-foreground": "2",
                "hud-background": "3",
                "hud-midground": "4",
                "hud-foreground": "5",
            },
            scale: {
                "-1": "-1",
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "fade-in-down": "fade-in-down 0.5s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
            },
        },
        fontFamily: {
            display: ["Lemonada", "cursive"],
        },
    },
    plugins: [],
};
