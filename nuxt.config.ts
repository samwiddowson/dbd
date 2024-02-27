// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    components: [{ path: "~/components/", pathPrefix: false }],
    modules: ["@nuxtjs/eslint-module", "@nuxtjs/sitemap", "@nuxt/image"],
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            title: "DBD | Double-Barrel Delivery",
        },
    },
    site: {
        url: "http://localhost:10667",
    },
})
