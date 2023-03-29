export const convertDecimal = (x) => {
    return Math.floor(x)
  };

export function convertWindSpeed(speed) {
    return (speed * 3.6).toFixed(2); // metre/saniye => kilometre/saat
}
export const windDirections = {
    N: [0, 11.25],
    NNE: [11.25, 33.75],
    NE: [33.75, 56.25],
    ENE: [56.25, 78.75],
    E: [78.75, 101.25],
    ESE: [101.25, 123.75],
    SE: [123.75, 146.25],
    SSE: [146.25, 168.75],
    S: [168.75, 191.25],
    SSW: [191.25, 213.75],
    SW: [213.75, 236.25],
    WSW: [236.25, 258.75],
    W: [258.75, 281.25],
    WNW: [281.25, 303.75],
    NW: [303.75, 326.25],
    NNW: [326.25, 348.75],
    N2: [348.75, 360]
};

export const getWindDirection = (degree) => {
    return Object.keys(windDirections).find((dir) => {
        const [minDeg, maxDeg] = windDirections[dir];
        return degree >= minDeg && degree < maxDeg;
    }) || "N";
};

export const getHourFromDate = (d) => {
    const date = new Date(d)
    const hour = date.getHours().toString().padStart(2, "0")
    const minute = date.getMinutes().toString().padStart(2 , "0")
    return `${hour}:${minute}`
}
export const getDayAndDate = (day) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const date = new Date(day);
    const dayOfWeek = days[date.getDay()];
    const formattedDate = date.toLocaleDateString('tr-TR', {day: 'numeric', month: 'numeric', year: 'numeric'});
    return `${dayOfWeek}, ${formattedDate}`;
}
export function groupForecastByDay(forecastList) {
    const daysForecast = [];

    for (let i = 0; i < forecastList.length; i += 8) {
        const dailyForecast = forecastList.slice(i, i + 8);
        const minTemp = Math.min(...dailyForecast.map(forecast => forecast.main.temp_min));
        const maxTemp = Math.max(...dailyForecast.map(forecast => forecast.main.temp_max));
        const day = new Date(dailyForecast[0].dt_txt).toLocaleDateString(undefined, { weekday: 'long' });
        const icon = dailyForecast[0].weather[0].icon;
        const description = dailyForecast[0].weather[0].description;
        const dailyWeather = { day, icon, description, minTemp, maxTemp };
        daysForecast.push(dailyWeather);
    }

    return daysForecast;
}

export const weatherIcons = {
    "01d" : "01d",
    "01n" : "01n",
    "02d" : "02d",
    "02n" : "02n",
    "03d" : "03d",
    "03n" : "03n",
    "04d" : "04d",
    "04n" : "04n",
    "09d" : "09d",
    "10d" : "10d",
    "10n" : "10n",
    "11d" : "11d",
    "13d" : "13d",
    "13n" : "13n",
    "50d" : "50d",
}
export default ({ app }, inject) => {
    inject('convertDecimal', convertDecimal);
};