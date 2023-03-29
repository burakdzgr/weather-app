<template>
  <section v-if="!isLoading">
    <div class="hourly__weather_content w-full">
      <ul class="flex flex-wrap items-center justify-between">
        <li v-for="items in dailyWeather" :key="items" class="p-5 w-1/4 flex flex-col items-center justify-center">
          <span>{{ items }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import {convertDecimal, weatherIcons} from "~/plugins/utils";
export default {
  name: "DailyWeather",
  setup(){
    const store = useStore()

    const dailyWeather = computed(() => store.state.dailyWeather )
    const isLoading = computed(() => store.state.isLoading)
    const getWeatherIconUrl = (iconCode) => {
      const iconName = weatherIcons[iconCode];
      if (iconName) {
        return `_nuxt/assets/images/weather-icons/${iconName}.png`;
      } else {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
      }
    };
    onMounted(async() => {
      await store.dispatch("fetchWeatherData")
    })

    return {
      dailyWeather,
      isLoading,
      weatherIcons,
      getWeatherIconUrl,
      convertDecimal
    }
  }
}
</script>

<style scoped>

</style>