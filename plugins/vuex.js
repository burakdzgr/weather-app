import { createStore } from "vuex";

const store = createStore( {
  state: {
    API_KEY: "e05b6f53697d9466b715004d19800a4a",
    currentWeather: ([]),
    hourlyWeather: null,
    dailyWeather: null,
    weeklyWeather: null,
    isLoading: true,
    searchQuery: '',
    cities: null,
    cityWeather: {},
    selectedCity : null,
  },

  mutations: {
    SET_CURRENT_WEATHER(state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    SET_HOURLY_WEATHER(state, hourlyWeather) {
      state.hourlyWeather = hourlyWeather;
    },
    SET_DAILY_WEATHER(state, dailyWeather) {
      state.dailyWeather = dailyWeather;
    },
    SET_WEEKLY_WEATHER(state, weeklyWeather) {
      state.weeklyWeather = weeklyWeather;
    },
    SET_LOADING_STATE(state, isLoading) {
      state.isLoading = isLoading;
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
    SET_CITIES(state, cities) {
      state.cities = cities
    },
    setCityWeather(state, payload) {
      state.cityWeather = payload
    },
    setSelectedCity(state, selectedCity){
      state.selectedCity   = selectedCity
    }
  },
  actions: {
    async fetchWeatherData({ commit, state }, ) {
      commit('SET_LOADING_STATE', true);
      try {
        let latitude, longitude;
        if (state.cities) {
          latitude = state.cities[0]?.coord.lat;
          longitude = state.cities[0]?.coord.lon;
          console.log("search component")
        } else if (navigator.geolocation) {
          const getPosition = () => {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
          };
          const position = await getPosition();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log("current component")
        } else if (location && location.latitude && location.longitude) {
          latitude = location.latitude;
          longitude = location.longitude;
        } else {
          throw new Error("Konum bilgisi bulunamadı.");
        }
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${state.API_KEY}&units=metric`
        );
        const data = await response.json();
        commit('SET_CURRENT_WEATHER', data);

        // Set hourly weather data
        const hourlyWeatherData = data.list.slice(0, 8).map((hourlyData) => ({
          time: hourlyData.dt_txt.split(' ')[1].slice(0, -3),
          temp: hourlyData.main.temp,
          weather: hourlyData.weather[0],
        }));
        commit('SET_HOURLY_WEATHER', hourlyWeatherData);

        // Set daily weather data
        const dailyWeatherData = data.list.reduce((dailyData, listItem) => {
          const date = listItem.dt_txt.split(' ')[0];
          if (!dailyData[date]) {
            dailyData[date] = {
              minTemp: listItem.main.temp_min,
              maxTemp: listItem.main.temp_max,
              weather: listItem.weather[0],
            };
          } else {
            const { minTemp, maxTemp } = dailyData[date];
            dailyData[date].minTemp = Math.min(minTemp, listItem.main.temp_min);
            dailyData[date].maxTemp = Math.max(maxTemp, listItem.main.temp_max);
          }
          return dailyData;
        }, {});
        commit('SET_DAILY_WEATHER', dailyWeatherData);

        // Set weekly weather data
        const weeklyWeatherData = Object.keys(dailyWeatherData)
            .sort((a, b) => new Date(a) - new Date(b))
            .slice(0, 7)
            .map((date) => ({
              date: new Date(date).toLocaleDateString(),
              minTemp: dailyWeatherData[date].minTemp,
              maxTemp: dailyWeatherData[date].maxTemp,
              weather: dailyWeatherData[date].weather,
            }));
        commit('SET_WEEKLY_WEATHER', weeklyWeatherData);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING_STATE', false);
      }
    },

    async searchCities({ commit , state}, searchQuery) {
      const query = `https://api.openweathermap.org/data/2.5/find?q=${searchQuery}&units=metric&appid=${state.API_KEY}&units=metric`;
      const response = await fetch(query)
      const data = await response.json()
      commit('SET_CITIES', data.list)
    },
    async getCityWeather({ commit, state }, city) {
      const query = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${state.API_KEY}&units=metric`;
      const response = await fetch(query)
      const data = await response.json()
      const getCityWeatherData = data
      commit('setCityWeather', getCityWeatherData)
    },
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);

});