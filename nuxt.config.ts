import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: [{ path: "~/components/", pathPrefix: false }],

    modules: [
        "@nuxt/eslint",
        "@nuxtjs/sitemap",
        "@nuxt/image",
        "@nuxt/test-utils/module",
    ],

    // plugins: ["~/plugins/db.server.js"],
    devtools: { enabled: true },

    css: ["~/assets/css/main.css"],

    vite: {
        plugins: [tailwindcss()],
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

    compatibilityDate: "2025-05-13",
})
