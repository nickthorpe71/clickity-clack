/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            backgroundImage: {
                sunset: "url('images/sunset.png')",
            },
            boxShadow: {
                vignette: "inset 0 0 100px 100px rgba(0, 0, 0, 0.4)",
            },
        },
    },
    plugins: [],
};
