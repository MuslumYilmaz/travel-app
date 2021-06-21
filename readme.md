# UDACITY CAPSTONE PROJECT TRAVEL WEATHER APP

## Project Description

- develop an app which allows user to enter a city and date and update display UI with city, country and weather information for the appropriate date

### File structure

- Client folder holds all the view, style and js folders.

- in client/js tripClass.js defines a class to store the last generated trip on localStorage
- calculateDay.js calculates days left to trip and returns it.
- apiHandler.js handles the request coming from the user.
- app.js handles update user interface

- Server folver handles server requests to the server.

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

### Run application on development mode

- npm run build-dev

- go to [http://localhost:3001/]
### Run application on production mode

- npm run build-prod

- npm start

- go to [http://localhost:3000/]

### Run tests

- Client/test directory contains test folders.

- Jest is used for testing purposes

- to run the tests: npm run test