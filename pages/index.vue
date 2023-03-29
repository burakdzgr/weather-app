<template>
 <section class="main-content">
   <div class="wrapper">
     <div class="container mx-auto px-10 md:px-0 flex flex-col justify-between">
      <div class="weather__content flex flex-col lg:flex-row items-center justify-between py-10 ">
        <CurrentWeather data-aos="fade-right" data-aos-delay="300" class="w-full lg:w-2/4"/>
        <HourlyWeather data-aos="fade-left" data-aos-delay="300" class="w-full lg:w-2/4 ml-0 lg:ml-12" />
      </div>
       <WeeklyWeather data-aos="fade-up" data-aos-delay="300"/>
     </div>
   </div>
 </section>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex"
import {getDayAndDate, getHourFromDate, getWindDirection} from "../plugins/utils"
import  CurrentWeather  from "~/components/CurrentWeather.vue";
import  HourlyWeather  from "~/components/HourlyWeather.vue";
import  WeeklyWeather  from "~/components/WeeklyWeather.vue";

export default defineComponent({
  components: {
    CurrentWeather,
    HourlyWeather,
    WeeklyWeather
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading)

    onMounted(async () => {
      await store.dispatch("fetchWeatherData")

    })
    return {

      isLoading,
      getDayAndDate,
      getHourFromDate,
      getWindDirection,
      CurrentWeather,
      HourlyWeather,
      WeeklyWeather
    };
  },
})
</script>
