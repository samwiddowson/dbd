// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-expect-error linter cannot find defineNuxtConfig
export default defineNuxtConfig({
    components: [{ path: "~/components/", pathPrefix: false }],
    modules: [
        "@nuxt/eslint",
        "@nuxtjs/sitemap",
        "@nuxt/image",
        "@nuxt/test-utils/module",
    ],
    eslint: {},
    // plugins: ["~/plugins/db.server.js"],
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
    runtimeConfig: {
        loggingLevel: "TRACE",
    },
    site: {
        url: "http://localhost:10667",
    },
})
