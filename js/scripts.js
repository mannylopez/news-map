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

    // for each loop to get title from geoJSON and add it to div
    data.features.forEach(function(metadata) {
      let title = metadata.properties.title
      let author = metadata.properties.author
      createStory(title, author)

    });

    // forEach loop

    function createStory(title, author) {
      
      // Find the 'stories' div
      let storyPane = document.querySelector('.stories')
      
      //Create a new div
      let div = document.createElement('div')
      
      //Add class="story", Add to class="stories" div
      div.setAttribute('class', 'story')

      // Create h4 tag
      let h4 = document.createElement("h4")
      
      // Add in the title parameter in the function to the heading 4 tag
      h4.textContent = title
      
      // singleStory.appendChild(h1)
      storyPane.appendChild(div).appendChild(h4)
    }

    console.log("End of promise block");
  })