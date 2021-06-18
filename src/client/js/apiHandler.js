import { geonames_key, weatherBit_key, pixaBay_key } from "../../../keys";
import { get, postData, updateUI } from './app';
import { calculateDay } from "./calculateDay";
import { date } from './app';

const url = `http://api.geonames.org/searchJSON?q=`;
const geoNames_key = `&maxRows=1&username=${geonames_key}`;
const weatherbit_key = `&key=${weatherBit_key}`;
const pixabay_key = `?key=${pixaBay_key}`;

  // function to run if trip will take place longer than 7 days
  export function weatherbitForecast() {
    get(`${url}${city.value}${geoNames_key}`)
    .then(geoNamesRes => {
      get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoNamesRes.geonames[0].lat}&lon=${geoNamesRes.geonames[0].lng}${weatherbit_key}`)
        .then(weatherbitRes => {
            get(`https://pixabay.com/api/${pixabay_key}&q=${geoNamesRes.geonames[0].name}&image_type=photo`)
              .then(res => {
                console.log(weatherbitRes.data[0]);
                        postData('/create', {
                             city: geoNamesRes.geonames[0].name,
                             date: calculateDay(date.value),
                             temp: (weatherbitRes.data[0].app_max_temp + weatherbitRes.data[0].app_min_temp) / 2, // calculate average forecast
                             icon: weatherbitRes.data[0].weather.icon,
                             description: weatherbitRes.data[0].weather.description,
                             image: res.hits[0].largeImageURL
                        });
              }).then(() => updateUI());
        });
    })
  }

  // function to run if trip will take place less than or equals to 7 days
  export function weatherbitDaily() {
    get(`${url}${city.value}${geoNames_key}`)
    .then(geoNamesRes => {
      get(`https://api.weatherbit.io/v2.0/current?lat=${geoNamesRes.geonames[0].lat}&lon=${geoNamesRes.geonames[0].lng}${weatherbit_key}&include=minutely`)
        .then(weatherbitRes => {
            get(`https://pixabay.com/api/${pixabay_key}&q=${weatherbitRes.data[0].city_name}&image_type=photo`)
              .then(res => {
                console.log("I am daily");
                        postData('/create', {
                             city: geoNamesRes.geonames[0].name,
                             date: calculateDay(date.value),
                             temp: weatherbitRes.data[0].temp,
                             icon: weatherbitRes.data[0].weather.icon,
                             description: weatherbitRes.data[0].weather.description,
                             image: res.hits[0].largeImageURL
                        });
              }).then(() => updateUI());
        });
    })
  }