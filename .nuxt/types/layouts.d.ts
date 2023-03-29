import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "C:/Users/sogut/OneDrive/Masaüstü/weather-app/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}