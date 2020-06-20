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

  // Destructuring
  const { title, author, publish_date, blurb, source, link, location_name, address } = data.properties;

// Create elements and populate with data from the parameters
  let storyDiv = document.createElement('div');
  storyDiv.setAttribute('class', "story");
  storyDiv.setAttribute('id', title);

  let storyLink = document.createElement("a");
  storyLink.setAttribute('href', link);
  storyLink.setAttribute('target', "_blank");
  storyLink.textContent = title;

  let storyTitle = document.createElement("h3");

  let storySourceAndDate = document.createElement("p");
  storySourceAndDate.textContent = source + " • " + publish_date;

  let storyBlurb = document.createElement("p");
  storyBlurb.setAttribute('class', 'blurb');
  storyBlurb.textContent = blurb;

// Add id to marker  
  // marker.getElement().setAttribute('id', title + " marker")

// Append the elements to the story div
  let storyPane = document.getElementById('stories');
  storyPane.appendChild(storyDiv).appendChild(storyTitle).appendChild(storyLink);
  storyPane.appendChild(storyDiv).appendChild(storyBlurb);
  storyPane.appendChild(storyDiv).appendChild(storySourceAndDate);

// When mouse hovers over the map pin, focus the story card
 
  marker.getElement().addEventListener('mouseenter', () => {


    let storyFocus = document.getElementById(title);
    storyFocus.setAttribute('id', 'story-hover');

    // marker.togglePopup()

    // marker.remove()
    
    // new mapboxgl.Marker({color:'#ffd5e5'})
    //   .setLngLat(data.geometry.coordinates)
    //   // .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //   //   .setHTML('<h3>' + data.properties.title + '</h3><p>' + data.properties.source + '</p>'))
    //   .addTo(map);
    
    // marker.togglePopup()
    
    // event.target.style.color = 'pink';
  });


  marker.getElement().addEventListener('mouseleave', () => {
    let storyFocus = document.getElementById('story-hover');
    storyFocus.setAttribute('id', title);
    // marker.togglePopup()
    // marker.togglePopup()

    // marker.remove()

    // marker = new mapboxgl.Marker({color:'#f5b7b1'})
    // .setLngLat(data.geometry.coordinates)
    // .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //   .setHTML('<h3>' + data.properties.title + '</h3><p>' + data.properties.source + '</p>'))
    // .addTo(map);

  });

  storyDiv.addEventListener('mouseenter', () => {
    // let abc = document.getElementById(title + ' marker');
    
    // console.log(marker.getElement())
    // marker.getElement().querySelector('g').querySelector('g').setAttribute('class', 'red')
    // console.log(marker.getElement().querySelector('g').querySelector('g'))
    // console.log(marker.getElement().querySelector('g'))
    // console.log(marker.getElement().querySelector('g'[0]))
    // console.log(marker.getElement().querySelector('g'[1]))
    // console.log(marker.getElement().querySelector('g'[2]))

    // console.log(marker.getElementByTagName('g'))
    // console.log(marker.getElement().getElementsByTagName("g")[2])
    marker.getElement().getElementsByTagName("g")[2].setAttribute('fill', 'black')

  })

  storyDiv.addEventListener('mouseleave', () => {
    // let abc = document.getElementById(title + ' marker');
    
    // console.log(marker.getElement())
    // marker.getElement().querySelector('g').querySelector('g').setAttribute('class', 'red')
    // console.log(marker.getElement().querySelector('g').querySelector('g'))
    // console.log(marker.getElement().querySelector('g'))
    // console.log(marker.getElement().querySelector('g'[0]))
    // console.log(marker.getElement().querySelector('g'[1]))
    // console.log(marker.getElement().querySelector('g'[2]))

    // console.log(marker.getElementByTagName('g'))
    // console.log(marker.getElement().getElementsByTagName("g")[2])
    marker.getElement().getElementsByTagName("g")[2].setAttribute('fill', '#3FB1CE')

  })

  marker.getElement().addEventListener('click', () => {
    

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















