<template>
  <section v-if="!isLoading">
    <div class="hourly__weather_content w-full">
      <h4 class="text-white text-3xl md:text-5xl font-bold">Hourly Forecast</h4>
      <ul class="grid grid-cols-4 gap-4 items-center justify-between mt-4">
        <li v-for="items in hourlyWeather" :key="items" class="p-5 grid grid-rows-3 gap-2 items-center justify-center justify-self-center text-center">
          <span class="block text-xl text-gray-400"> {{ items.time }} </span>
          <img class="w-10 h-10 object-cover" :src="getWeatherIconUrl(items.weather.icon)" alt="">
          <span class="text-white font-bold text-xl ">{{ convertDecimal(items.temp) }}°C</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"
import { convertDecimal, weatherIcons } from "../plugins/utils"

export default {
  name: "HourlyWeather",
  setup() {
    const store = useStore()

    const hourlyWeather = computed(() => store.state.hourlyWeather)
    const isLoading = computed (() => store.state.isLoading)
    const getWeatherIconUrl = (iconCode) => {
      const iconName = weatherIcons[iconCode];
      if (iconName) {
        return `_nuxt/assets/images/weather-icons/${iconName}.png`;
      } else {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
      }
    };
    return {
      hourlyWeather,
      isLoading,
      weatherIcons,
      getWeatherIconUrl,
      convertDecimal
    }
  }
}
</script>

<style scoped>
.hourly__weather_content ul{
  background: rgb(14 12 31 / 10%);
  border-radius: 16px;
  box-shadow: 4px 4px 60px rgb(59 42 96);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
