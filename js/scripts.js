mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';
  
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
