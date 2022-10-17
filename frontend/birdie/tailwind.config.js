/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

    theme: {
        extend: {
            screens: {
                xm: "440px",
                xxl: "1500px",
            },
        },
    },
    plugins: [],
};
