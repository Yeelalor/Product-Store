export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },


  imports: {
    // Auto-import is enabled by default, but you can configure it
    autoImport: true,
    dirs: [
      // These directories are scanned by default
      "composables",
      "utils",
    ],
  },
  ssr: false,
  css: [
    "vuetify/styles",
    "@/assets/css/fonts.css",
    "@/assets/css/main.css",
    "@mdi/font/css/materialdesignicons.css",
    "~/assets/css/fonts.css",

    "leaflet/dist/leaflet.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["vuetify", "xlsx"],
  },

  vite: {
    // plugins: [tsconfigPaths()],
    define: {
      "process.env.DEBUG": false,
    },
    optimizeDeps: {
      exclude: ["html2pdf.js"],
    },
    server: {
      watch: {
        ignored: ["**/node_modules/**"],
      },
    },
  },

  modules: ["@nuxtjs/i18n", "@nuxt/fonts", "nuxt-auth-utils", "@pinia/nuxt"],
  i18n: {
    langDir: "locales/",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "la", name: "ລາວ", file: "la.json" },
      { code: "zh", name: "中文", file: "zh.json" },
      { code: "vn", name: "Tiếng Việt", file: "vn.json" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    strategy: "no_prefix", // if you don't want /en/ in URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // only on first visit
      alwaysRedirect: false, // avoid overwriting user's choice
    },
  },

  app: {
    head: {
      title: "LDB Border",
      link: [
        {
          rel: "icon",
          type: "image/png", // or 'image/x-icon' for .ico
          href: "/ldb-logo.png",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV === "production"
          ? "http://10.0.10.49:9999/borderapi-prod/api/v1/"
          : "http://10.0.10.49:9999/borderapi-prod/api/v1/",
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiBaseMain:
        process.env.NODE_ENV === "production"
          ? "http://10.0.10.11:3333/api/dev/service/"
          : "http://192.168.100.31:3333/api/dev/service/",
      // : "http://10.0.10.11:3333/api/dev/service/",
    },
  },
});
