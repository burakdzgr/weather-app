import { defineNuxtConfig } from "nuxt/config"
export default defineNuxtConfig({
    head: {
        link: [
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
            },
        ],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon'
    ],
    plugins: [
        '~/plugins/utils.js',
        '~/plugins/vuex.js',
        { src: '~/plugins/aos', mode: 'client' }
    ],
    purgeCSS: {
        whitelist: ["aos-init", "aos-animate", "data-aos-delay", "data-aos-duration", "fade-up", "zoom-in"],
    }
  })

