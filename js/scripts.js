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

  // Get the longitude and latitude values from the json, set it to a marker, and add it to the map
  .then(function(data) {

    data.features.forEach(function(marker) {
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
    
    // Add stories to stories pane
    // Get value from geojson
    let text = data.features[0].properties.title
    
    // // select the first div with id="#story1"
    // let title = document.querySelector('#story1');
    
    // // Add it to story div
    // title.innerHTML = text
  

    // forEach loop

    // 0. Find the 'stories' div
    let storyPane = document.querySelector('.stories')
    console.log(storyPane)
    // 1. Create a new div
    let div = document.createElement('div')
    div.textContent = text
    // 2. Add class="story"
    // 3. Add to class="stories" div
    div.setAttribute('class', 'story')
    // 4. Get title, author, link, source, ...
    // 5. Add that info to div
    // 6. Add div to index.html
    // document.body.container.appendChild(div)
    console.log(div)
    storyPane.appendChild(div)

    console.log("End of promise block");
  })