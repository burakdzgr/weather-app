<template>
  <section v-if="!isLoading">
    <div class="daily-weather-box ">
      <div class="daily__weather__info__content grid grid-cols-2 items-end md:items-center justify-center gap-4">
        <div class="daily__weather__info__box ">
          <div class="daily__timezone">
            <span  class="block text-white/50 text-xl font-bold">{{ getDayAndDate(currentWeather.list[0].dt_txt) }}</span>
          </div>
          <div class="city__info flex items-start py-9">
            <span class="block text-white text-5xl font-bold">{{ currentWeather.city.name }}</span>
            <span class="block text-white text-2xl ml-2">{{ currentWeather.city.country }}</span>
          </div>
          <div class="city__temp__info " >
            <span class="block text-white text-8xl font-bold">{{ convertDecimal(currentWeather.list[0].main.temp) }}°C</span>
            <span class="block text-gray-400 text-xl italic"> {{ currentWeather.list[0].weather[0].description }}</span>
          </div>
          <div class="city__weather__info pt-4 ">
            <div class="city__wind-box flex items-center">
                <span class="wind__speed block text-white text-lg">
                  <b>Wind Speed:</b>
                  {{ convertWindSpeed(currentWeather.list[0].wind.speed) }} km/s
                </span>
            </div>
            <div class="city__feels__like__box flex items-center flex">
                <span class="wind__speed block text-white text-lg mt-1">
                  <b>Feels Like:</b>
                  {{ convertDecimal(currentWeather.list[0].main.feels_like) }}°C
                </span>
            </div>
            <div class="city__humidity__box flex items-center flex">
                <span class="wind__speed block text-white text-lg mt-1">
                  <b>Humidity</b>
                  {{ currentWeather.list[0].main.humidity }}%
                </span>
            </div>
          </div>
        </div>
        <div class="daily__weather_icon__box  ">
          <img class="w-full h-auto object-cover" :src="getWeatherIconUrl(currentWeather.list[0].weather[0].icon)" alt="">
        </div>
      </div>
    </div>
  </section>
  <span v-else class="block text-white font-bold">Loading...</span>
</template>


<script>
import { computed, defineComponent, onMounted } from "vue";
import {getDayAndDate, getHourFromDate, convertWindSpeed, convertDecimal,weatherIcons } from "../plugins/utils"

import { useStore } from "vuex";
export default defineComponent({
  name: "CurrentWeather",
  setup() {
    const store = useStore();

    const currentWeather = computed(() => store.state.currentWeather);
    const isLoading = computed(() => store.state.isLoading);
    const weather = computed(() => store.state.currentWeather);
    const getWeatherIconUrl = (iconCode) => {
      const iconName = weatherIcons[iconCode];
      if (iconName) {
        return `_nuxt/assets/images/weather-icons/${iconName}.png`;
      } else {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
      }
    };
    const weatherBackground = computed(() => {
      if (!weather.value) {
        console.log("Cannot get weather data!");
        return "";
      }
      const conditionName = weather.value.list[0].weather[0].main;
      if (conditionName === "Rain") {
        return "_nuxt/assets/images/rainly-day.jpeg";
      } else if (conditionName === "Clouds") {
        return "_nuxt/assets/images/clouds-day.jpeg";
      } else if (conditionName === "Clear") {
        return "_nuxt/assets/images/clear-sky.jpeg";
      } else if (conditionName === "Sunny") {
        return "_nuxt/assets/images/sunny-day.webp";
      } else {
        return "";
      }
    });

    return {
      currentWeather,
      weatherBackground,
      isLoading,
      getDayAndDate,
      getHourFromDate,
      convertWindSpeed,
      convertDecimal,
      weatherIcons,
      getWeatherIconUrl,
    };
  },
});
</script>

<style scoped>

.daily__bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  width: 100%;
}
.daily__weather_icon__box img{
  filter: drop-shadow(30px 10px 4px #4444dd);
}
</style>