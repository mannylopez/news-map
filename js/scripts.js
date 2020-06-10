// Load mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

let STORIES = '';
// Load stories.geojson file from the data directory
fetch('/news-map/data/stories.geojson')
  .then(response => response.json())
  .then(data => STORIES = data)
  .then(() => console.log(STORIES));
  
  // console logs the coordinates of the first item in the object
  // .then(() => console.log(STORIES.features[0].geometry.coordinates));