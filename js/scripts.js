// Load mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

// Takes data in, creates a story card, and inserts it into the stories div
function createStory(title, author, publishDate, blurb, source, link) {
  let storyPane = document.getElementById('stories');

  // Create elements and populate with data from the parameters
  let div = document.createElement('div');
  div.setAttribute('class', 'story');

  let storyLink = document.createElement("a");
  storyLink.setAttribute('href', link);
  storyLink.setAttribute('target', "_blank");
  storyLink.textContent = title;

  let storyTitle = document.createElement("h3");

  // let storyAuthorAndDate = document.createElement("p");
  // storyAuthorAndDate.textContent = "by " + author + " on " + publishDate;

  let storySourceAndDate = document.createElement("p");
  storySourceAndDate.textContent = source + " • " + publishDate;

  let storyBlurb = document.createElement("p");
  storyBlurb.setAttribute('class', 'blurb');
  storyBlurb.textContent = blurb;

  // Append the elements to the story div
  storyPane.appendChild(div).appendChild(storyTitle).appendChild(storyLink);
  storyPane.appendChild(div).appendChild(storyBlurb);
  // storyPane.appendChild(div).appendChild(storyAuthorAndDate);
  storyPane.appendChild(div).appendChild(storySourceAndDate);
}

// Load stories.geojson file from the data directory
fetch('/news-map/data/stories.geojson')
  .then(response => response.json())

  // From the json, create a marker based on the coordinates, place it on the map, and call createStory()
  // create the story, place it in the stories pane
  .then(function(data) {
    map.on('load', function() {
      map.addSource('places', {
        'type': 'geojson',
        'data': data
      }) 
    })
  
    

    data.features.forEach(function(metadata) {
      
      new mapboxgl.Marker()
        .setLngLat(metadata.geometry.coordinates)
        .addTo(map);
      
      let title = metadata.properties.title;
      let author = metadata.properties.author;
      let publishDate = metadata.properties.publish_date;
      let blurb = metadata.properties.blurb;
      let source = metadata.properties.source;
      let link = metadata.properties.link;
      
      createStory(title, author, publishDate, blurb, source, link);
    });
    console.log("End of promise block");
  })