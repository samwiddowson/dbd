/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            boxShadow: {
                "glow-sm": "0 0 2.5px",
                "glow-md": "0 0 5px",
                "glow-lg": "0 0 10px",
            },
        },
    },
    plugins: [],
}
