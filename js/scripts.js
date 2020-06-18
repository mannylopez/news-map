mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

// Takes JSON in, adds a marker to the map, creates a story card, and inserts it into the stories div side panel
function createStory(data) {

  // Add marker to the map
  let marker = new mapboxgl.Marker()
    .setLngLat(data.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + data.properties.title + '</h3><p>' + data.properties.source + '</p>'))
    .addTo(map);

  // ??? How do I add a class name to the popup
  // let popup = new mapboxgl.Popup()
  // popup.addClassName('some-class')

// Create a story card
  let title = data.properties.title;
  let author = data.properties.author;
  let publishDate = data.properties.publish_date;
  let blurb = data.properties.blurb;
  let source = data.properties.source;
  let link = data.properties.link;

// Create elements and populate with data from the parameters
  let div = document.createElement('div');
  div.setAttribute('class', "story");
  div.setAttribute('id', title);

  let storyLink = document.createElement("a");
  storyLink.setAttribute('href', link);
  storyLink.setAttribute('target', "_blank");
  storyLink.textContent = title;

  let storyTitle = document.createElement("h3");

  let storySourceAndDate = document.createElement("p");
  storySourceAndDate.textContent = source + " • " + publishDate;

  let storyBlurb = document.createElement("p");
  storyBlurb.setAttribute('class', 'blurb');
  storyBlurb.textContent = blurb;


// Append the elements to the story div
  let storyPane = document.getElementById('stories');
  storyPane.appendChild(div).appendChild(storyTitle).appendChild(storyLink);
  storyPane.appendChild(div).appendChild(storyBlurb);
  storyPane.appendChild(div).appendChild(storySourceAndDate);

// When mouse hovers over the map pin, focus the story card
  marker.getElement().addEventListener('mouseenter', () => {
    let storyFocus = document.getElementById(title);
    storyFocus.setAttribute('id', 'story-hover');
    // marker.togglePopup()

    // new mapboxgl.Marker({color:'#ffd5e5'})
    // .setLngLat(data.geometry.coordinates)
    // .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //   .setHTML('<h3>' + data.properties.title + '</h3><p>' + data.properties.source + '</p>'))
    // .addTo(map);

    
  });

  marker.getElement().addEventListener('mouseleave', () => {
    let storyFocus = document.getElementById('story-hover');
    storyFocus.setAttribute('id', title);
    // marker.togglePopup()
  });

  marker.getElement().addEventListener('click', () => {
    console.log(marker._color)
    marker._color = "#ff89b6"
    console.log(marker._color)
  })
}


// Load stories.geojson file from the data directory
fetch('/news-map/data/stories.geojson')
  .then(response => response.json())
  .then(function(data) {
    data.features.forEach(function(data) {
      createStory(data);
    });
    console.log("End of promise block");
  })















