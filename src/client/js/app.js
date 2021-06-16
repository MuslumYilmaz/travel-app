/* Global Variables */
const city = document.getElementById('city');
const date = document.getElementById('date-picker');
const card = document.querySelector('.card__inner');
const backButton = document.querySelector('.go-back');



window.addEventListener('DOMContentLoaded', (event) => {
  calculateDay();
  if (localStorage.getItem("trip") == null) {
    localStorage.setItem("trip", null);
  }
  let trip = JSON.parse(localStorage.getItem("trip"));

  let lastTrip = new Trip(trip.city, trip.icon, trip.description, trip.temp, trip.image);
});

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
  console.log(date.value);
        if (calculateDay(date.value) <= 7 && calculateDay(date.value) >= 0) {
          weatherbitDaily();
        } else if (calculateDay(date.value) > 7) {
          weatherbitForecast();
        } else {
          return;
        }
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