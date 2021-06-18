import { calculateDay } from './js/calculateDay';
import { get, postData, updateUI } from './js/app';
import { Trip } from './js/tripClass';

import './styles/saved-trip.scss';
import './styles/styles.scss';

var requireContext = require.context("./icons", true, /^\.\/.*\.png$/);
requireContext.keys().map(requireContext);

window.addEventListener('DOMContentLoaded', (event) => {
    calculateDay();
    if (!localStorage.getItem("trip")) {
      return;
    } else {
      let trip = JSON.parse(localStorage.getItem("trip"));
      let lastTrip = new Trip(trip.city, trip.icon, trip.description, trip.temp, trip.image);
    }

  });

export {
    get,
    postData,
    updateUI
}