/* Global Variables */
const city = document.getElementById('city');
const date = document.getElementById('date-picker');
const card = document.querySelector('.card__inner');
const backButton = document.querySelector('.go-back');

const url = `http://api.geonames.org/searchJSON?q=`;
const geoNames_key = `&maxRows=1&username=${geonames_key}`;
const weatherbit_key = `&key=${weatherBit_key}`;
const pixabay_key = `?key=${pixaBay_key}`;

window.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem("trip") == null) {
    localStorage.setItem("trip", null);
  }
  let trip = JSON.parse(localStorage.getItem("trip"));

  let lastTrip = new Trip(trip.city, trip.icon, trip.description, trip.temp, trip.image);
});

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
  get(`${url}${city.value}${geoNames_key}`)
    .then(geoNamesRes => {
      get(`https://api.weatherbit.io/v2.0/current?lat=${geoNamesRes.geonames[0].lat}&lon=${geoNamesRes.geonames[0].lng}${weatherbit_key}&include=minutely`)
        .then(weatherbitRes => {
            get(`https://pixabay.com/api/${pixabay_key}&q=${weatherbitRes.data[0].city_name}&image_type=photo`)
              .then(res => {
                console.log(res.hits[0]);
                        postData('/create', {
                             city: geoNamesRes.geonames[0].name,
                             date: calculateDay(),
                             temp: weatherbitRes.data[0].temp,
                             icon: weatherbitRes.data[0].weather.icon,
                             description: weatherbitRes.data[0].weather.description,
                             image: res.hits[0].largeImageURL
                        });
              }).then(() => updateUI());
        });
    })
  }

  async function get(url) {
    try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
    } catch (err) {
    console.error('err', err);
    }
    
    }

    /* Function to POST data */
  const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), 
  });

  try {
        const newData = await response.json();
      } catch(error) {
      console.log("error", error)
  }
};

const newDate = document.getElementById('date');
const newTemp = document.getElementById('temp');
const newContent = document.getElementById('content');
const resCity = document.getElementById('resCity');
const description = document.getElementById('description');
let icon = document.querySelector('.image-icon');
const image = document.getElementById('place-image');

const updateUI = async () => {
  console.log(icon)
  const request = await get("/all");

    try{
      resCity.innerHTML = `${request.city} is ${request.date} days away`;
      icon.src = `../icons/${request.icon}.png`;
      description.innerHTML = request.description;
      temp.innerHTML = `${request.temp}°`;
      image.style.backgroundImage = `url('${request.image}')`;

      let newTrip = {"city": request.city, "icon": `../icons/${request.icon}.png`, "description": request.description, "temp": request.temp, "image": request.image }
      
      localStorage.setItem("trip", JSON.stringify(newTrip));

      card.classList.toggle('is-flipped');
    } catch(error){
      console.log("error", error);
    }
  };

  // card-flip
  backButton.addEventListener('click', () => {
    let trip = JSON.parse(localStorage.getItem("trip"));

    let lastTrip = new Trip(trip.city, trip.icon, trip.description, trip.temp, trip.image);
    card.classList.toggle('is-flipped');
  });

  function calculateDay() {
    let start = new Date().getTime();
    let end = new Date(date.value).getTime();
    let diff = 0;
    let days = 1000 * 60 * 60 * 24;

    diff = end - start;
    console.log(Math.floor(diff / days))
    return Math.floor(diff / days);
  }

  const lastTripImage = document.getElementById('saved-trip-image');
  const savedCity = document.getElementById('saved-city');
  const savedTemp = document.getElementById('saved-temp');
  const savedDescription = document.getElementById('saved-description');
  const savedIcon = document.getElementById('saved-icon');

  class Trip {
    constructor(city, icon, description, temp, image) {
      savedCity.innerHTML = city;
      savedTemp.innerHTML = temp;
      savedIcon.src = icon;
      savedDescription.innerHTML = description;
      lastTripImage.style.backgroundImage = `url('${image}')`;
    }
  }
