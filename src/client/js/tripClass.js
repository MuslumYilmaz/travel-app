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
