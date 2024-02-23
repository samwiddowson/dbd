// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    components: [
        { path: "~/components/ui", extensions: ["vue"] },
        { path: "~/components/ui/forms", extensions: ["vue"] },
        { path: "~/components/layouts", extensions: ["vue"] },
    ],
    modules: ["@nuxtjs/eslint-module"],
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
