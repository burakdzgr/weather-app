<template>
  <LoadingIndicator v-if="isLoading"/>
  <form v-else @submit.prevent class="flex items-center rounded-lg">
    <label for="simple-search" class="sr-only">Search Cities</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </div>
      <input v-model="searchQuery" @input="searchCities" type="text" id="simple-search" class="text-gray-400 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 bg-[#151626] w-full" placeholder="Search" >
      <ul v-if="searchQuery.length > 0" class="absolute w-full h-max bg-gray-900 z-10">
        <li v-if="cities === 0" class="text-white cursor-pointer">
          No results found.
        </li>
        <li v-if="isLoading" class="text-white cursor-pointer">
          Loading...
        </li>

        <li v-else v-for="(city, index) in cities" :key="index" @click="getCityWeather(city)" class="text-gray-400 cursor-pointer p-2.5 hover:bg-gray-400 hover:text-gray-900">
          {{ city.name }} / {{ city.sys.country }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { debounce } from "lodash";

export default {
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const searchQuery = ref("");
    const cities = ref(null);

    const searchCities = debounce(() => {
      isLoading.value = true;
      store.dispatch("searchCities", searchQuery.value).then(() => {
        isLoading.value = false;
        cities.value = store.state.cities;
      });
    }, 500);

    const getCityWeather = async (city) => {
      const { latitude, longitude } = city.coord;
      await store.dispatch("fetchWeatherData", { latitude, longitude });
      store.commit("SET_CITIES", city);
      searchQuery.value = "";
      cities.value = [];
      closeResults();
    };
    const closeResults = () => {
      searchQuery.value = "";
      cities.value.length = [];
    };


    return {
      isLoading,
      searchQuery,
      searchCities,
      getCityWeather,
      cities,
      closeResults,
    };
  },
};
</script>
