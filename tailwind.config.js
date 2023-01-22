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
        },
        fontFamily: {
            display: ["Lemonada", "cursive"],
        },
    },
    plugins: [],
};
