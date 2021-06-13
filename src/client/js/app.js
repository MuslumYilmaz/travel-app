/* Global Variables */
const city = document.getElementById('city');
const feelings = document.getElementById('feelings');
const feels_like = document.getElementById('feels-like');
const card = document.querySelector('.card__inner');
const backButton = document.querySelector('.go-back');

const url = `http://api.geonames.org/searchJSON?q=`
const geoNames_key = `&maxRows=1&username=${geonames_key}`
const weatherbit_key = `&key=${weatherBit_key}`
const pixabay_key = `?key=${pixaBay_key}`

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
  get(`${url}${city.value}${geoNames_key}`)
    .then(newData => {
      get(`https://api.weatherbit.io/v2.0/current?lat=${newData.geonames[0].lat}&lon=${newData.geonames[0].lng}${weatherbit_key}&include=minutely`)
        .then(res => {
            console.log(res);
            get(`https://pixabay.com/api/${pixabay_key}&q=${res.data[0].city_name}&image_type=photo`)
              .then(res => {
                  console.log(res.hits[0].largeImageURL);
              })
        })
      // postData('/create', {
      //   name: newData.name,
      //   description: newData.weather[0].main,
      //   temp: newData.main.temp,
      //   feelings: feelings.value,
      //   feels_like: newData.main.feels_like,
      //   date: date
      // });
    })
    // .then(() => updateUI());
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
//const city = document.getElementById('city');

const updateUI = async () => {
  const request = await get("/all");

    try{
  //    city.innerHTML = request.name;
      newDate.innerHTML = date;
      newTemp.innerHTML = request.temp;
      description.innerHTML = request.description
      feels_like.innerHTML = request.feels_like;
      newContent.innerHTML = `How I'm feeling: ${request.feelings}`;
      card.classList.toggle('is-flipped');
    } catch(error){
      console.log("error", error);
    }
  };

  // card-flip
  backButton.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });