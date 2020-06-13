// Load mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

// Load stories.geojson file from the data directory
fetch('/news-map/data/stories.geojson')
  // Turn the fetch response into json
  .then(response => response.json())

  // Get the longitude and latitude values from the json
  .then(function(data) {
    data.features.forEach(function(marker) {
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
    console.log("End of promise block");
  });