<template>
  <section v-if="!isLoading">
    <div class="weekly__weather_content w-full">
      <div class="weekly__weather_content_box py-5">
        <h4 class="text-white text-3xl md:text-5xl font-bold">Weekly Forecast</h4>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          <li v-for="items in weeklyWeather" :key="items" class="bg-white p-5 rounded-lg  flex flex-col items-center justify-center">
            <span class="text-xl text-gray-400">{{ items.date }}</span>
            <img class="w-20 h-20 object-cover mt-2" :src="getWeatherIconUrl(items.weather.icon)" alt="">
            <div class="min__max__info mt-2">
             <span class="text-white flex items-center">
              <Icon name="ri:arrow-up-down-fill" class="mr-2 text-gray-400"/>
                Min {{ convertDecimal(items.minTemp) }}°C /
                Max {{ convertDecimal(items.maxTemp) }}°C
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>


<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { getDayAndDate ,convertDecimal, weatherIcons } from "../plugins/utils"

export default {
  name: "WeeklyWeather",
  setup() {
    const store = useStore()

    const weeklyWeather = computed (() => store.state.weeklyWeather)
    const isLoading = computed (() => store.state.isLoading)
    const getWeatherIconUrl = (iconCode) => {
      const iconName = weatherIcons[iconCode];
      if (iconName) {
        return `_nuxt/assets/images/weather-icons/${iconName}.png`;
      } else {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
      }
    };

    return { weeklyWeather, isLoading, getWeatherIconUrl,convertDecimal }
  }
}
</script>

<style scoped>
.weekly__weather_content ul li{
  background: rgb(72 74 102 / 35%);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>