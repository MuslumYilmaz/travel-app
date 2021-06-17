# UDACITY CAPSTONE PROJECT TRAVEL WEATHER APP

## Project Description

- develop an app which allows user to enter a city and date and update display UI with city, country and weather information for the appropriate date

### Project Requirements

- utilize [GeoNames.org](https://www.geonames.org/) API to fetch location data

- utilize [Pixabay.com](https://pixabay.com/) API to fetch images of city and country

- utilize [Weatherbit.io](https://www.weatherbit.io/) to fetch weather for certain dates

- use webpack for development and production builds

- use jest to test

- install and use service workers

### Starting Instructions

- git clone this repo

- run npm install

- obtain API keys for Weatherbit, Pixabay and GeoNames with your own accounts and place them in keys.js file matching api keys in root folder
- example: 
  export const geonames_key = "API_KEY";
  export const weatherBit_key = "API_KEY";
  export const pixaBay_key = "API_KEY"; 

- run npm run build-dev and npm run build-prod

- go to [http://localhost:3000/] or (http://localhost:3001/)
