<template>
  <div v-if="isLoading" class="loading-indicator">
    <div class="c-weather-icon c-weather-icon--windySunny">
      <div class="c-weather-iconــsunlight">
        <img src="https://i.ibb.co/qj29CgD/moon.png" alt="" class="c-weather-icon__image c-weather-icon__image--sun-circle">
        <img src="https://i.ibb.co/ZJMHt1F/moon-point.png" alt="" class="c-weather-icon__image c-weather-icon__image--moon-points">
      </div>
      <img src="https://i.ibb.co/KxvPPfY/wind.png" alt="" class="c-weather-icon__image c-weather-icon__image--wind">
    </div>
  </div>
</template>

<script >
import { computed } from 'vue'
import { useStore} from "vuex";
export default {
  setup(){
    const store = useStore()
    const isLoading = computed(() => store.state.isLoading)

    return{ isLoading}
  }
}
</script>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(11, 12, 30);
  background: radial-gradient(circle, rgba(11, 12, 30, 1) 0%, rgba(64, 45, 103, 1) 0%, rgba(14, 12, 31, 1) 62%);
  z-index: 9999;
}

.c-weather-icon {
  position: relative;
  width: 20vw;
  height: 20vw;
  display: inline-block;
  margin: 15px;
}

.c-weather-icon__image {
  position: absolute;
}

.c-weather-icon__image--moon-points {
  width: 95%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  top: 51%;
  left: 42%;
  animation: moon-points 2s ease infinite;
}
.c-weather-icon__image--sun-circle {
  width: 100%;
  top: 0;
  left: 0;
}

.c-weather-icon__image--wind {
  width: 60%;
  top: 30%;
  right: -10%;
  animation: wind 1.3s linear infinite;
}
@keyframes sun-points {
  50% {
    transform: translate(-50%,-50%) scale(1.1) rotate(10deg);
  }
}
@keyframes moon-points {
  50% {
    opacity: 0;
    transform: translate(-50%,-50%) scale(1.05);
  }
}

@keyframes wind {
  to {
    transform: translateX(-60%);
    opacity: 0;
  }
}

</style>
