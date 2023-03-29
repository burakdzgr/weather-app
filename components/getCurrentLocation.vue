<template>
  <div >
    <LoadingIndicator v-if="isLoading" />
    <button v-else @click="getCurrentLocation()" :disabled="isLoading" class="bg-[#151626] hover:bg-[#444552] text-gray-400 font-semibold py-2 px-4 rounded w-full flex items-center justify-center">
      <Icon name="ic:round-share-location" class="mr-2 w-5 h-5 text-gray-400"/>
        {{ isLoading ? 'Loading...' : 'Current' }}
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "GetCurrentLocation",
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);
    const cities = computed(() => store.state.cities)
    const getCurrentLocation = async () => {
      try {
        store.commit('SET_LOADING_STATE', true);
        store.commit("SET_CITIES", null);
        const getPosition = () => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        };
        const position = await getPosition();
        const { latitude, longitude } = position.coords;
        await store.dispatch("fetchWeatherData", { latitude, longitude});
      } catch (error) {
        console.error(error);
      } finally {
        store.commit('SET_LOADING_STATE', false);
      }
    };

    return {
      getCurrentLocation,
      isLoading
    };
  },
};
</script>
