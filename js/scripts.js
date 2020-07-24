mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiY2tjdTNhcW1mMHkzYzJ4cDcxMjE3N2J5cCJ9.N01v6yRINwTuPEqwUzW-gw';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [2.154007, 41.390205], // starting position [lng, lat]
  zoom: 1 // starting zoom
});

// Query The New York Times API for the top stories
axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=lzxwltdnApRAJYBeqX86gAEOOcWk6Fgn')

  // Isolate the results. Returns an array of story objects.
  .then((response) => {
    console.log(response.data.num_results)
    return response.data.results;
  }, (error) => {
    console.log(error);
  })
  
  // Returns only the stories that have anything in the geo_facet array. Returns an array of story objects with text geo locations.
  .then(function(data) {
    let arrayWithGeo = []

    for (let entry of data) {
      if (entry.geo_facet.length) {
        arrayWithGeo.push(entry)
      }
    }
    console.log(arrayWithGeo.length)
    return arrayWithGeo
  })

  // Extract location from geo_facet, 
  .then(async function(data) {
    let arrayWithCoordinates = []
    // console.log("1. Empty arrayWithCoordinates created")

    for (let entry of data) {
      // console.log("2. Isolate one story object")
      
      // Add coordinates property and empty array to every story
      entry.coordinates = []
      entry.source = "The New York Times"

      let location = entry.geo_facet
      
      async function getMapboxResults() {
        for (let place of location) {
          console.log(place)
          // console.log("4. Iterate over a place from the geo_facet array")
          
          locationNoSpace = place.replace(/\s/g, '+')
          // console.log(locationNoSpace)
          // console.log("5. Replace the space with a +")
          
          let request = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + locationNoSpace + ".json?access_token=pk.eyJ1IjoibWFubnkiLCJhIjoiY2tjdTNhcW1mMHkzYzJ4cDcxMjE3N2J5cCJ9.N01v6yRINwTuPEqwUzW-gw"

          // console.log("6. Create the mapbox request URL")
          // console.log(request)

          await axios.get(request)
          .then((response) => {
            
            // console.log("7. Get mapbox API results for " + response.data.features[0].text)

            let centerArray = entry.coordinates
            // console.log(centerArray)

            centerArray.push(response.data.features[0].center)
            // console.log("8. Push center coordinates to story " + response.data.features[0].text)
            
          });

        } 
        // console.log(data)
      }

      await getMapboxResults()
      // console.log(data)
    }
    // console.log(arrayWithCoordinates)
    return data
    
    
  })

  .then(function(data) {
    console.log("the length is " + data.length) 
    data.forEach(function(data) {
      // console.log(data)
      // console.log(data.coordinates)

      // Function that takes in data and creates story cards, markers, popups, and user interaction
      createStory(data);
    });
  })




// Takes JSON in, adds a marker to the map, creates a story card, and inserts it into the stories div side panel
function createStory(data) {

// Create a story card
  const { title, url, abstract, published_date, source, byline, section } = data;

  // Remove time and return only YYYY-MM-DD
  let truncatedDate = published_date
  truncatedDate = truncatedDate.substring(0,10)

// Create elements and populate with data from the parameters
  let storyDiv = document.createElement('div');
  storyDiv.setAttribute('class', "story");
  storyDiv.setAttribute('id', title);

  let storyLink = document.createElement("a");
  storyLink.setAttribute('href', url);
  storyLink.setAttribute('target', "_blank");
  storyLink.textContent = title;

  let storyTitle = document.createElement("h3");

  let storyBlurb = document.createElement("p");
  storyBlurb.setAttribute('class', 'blurb');
  storyBlurb.textContent = abstract;

  let storySourceAndDate = document.createElement("p");
  storySourceAndDate.textContent = source + " • " + truncatedDate;


// Add id to marker  
  // marker.getElement().setAttribute('id', title + " marker")

// Append the elements to the story div
  let storyPane = document.getElementById('stories');

  // Adds opinion text if the article is an opinion piece
  if (section === "opinion") {
    let storyOpinion = document.createElement("p");
    storyOpinion.textContent = "Opinion";
    storyPane.appendChild(storyDiv).appendChild(storyOpinion)
  }

  storyPane.appendChild(storyDiv).appendChild(storyTitle).appendChild(storyLink);
  storyPane.appendChild(storyDiv).appendChild(storyBlurb);
  storyPane.appendChild(storyDiv).appendChild(storySourceAndDate);


// Create marker for each data coordinate in the data and marker interaction
  data.coordinates.forEach(function(point) {

    // Add marker to the map
    let marker = new mapboxgl.Marker()
      .setLngLat(point)
      .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false}) // add popups
      .setHTML('<h3><a href="'+ url + '" target="_blank">' + title + '</h3><p>' + source + ' • ' + truncatedDate + '</p></a>'))
      .addTo(map);

    // When mouse hovers over the map pin, focus the story card 
    marker.getElement().addEventListener('mouseenter', () => {
      let storyFocus = document.getElementById(title);
      storyFocus.setAttribute('id', 'story-hover');
    });


    marker.getElement().addEventListener('mouseleave', () => {
      let storyFocus = document.getElementById('story-hover');
      storyFocus.setAttribute('id', title);
    });

    storyDiv.addEventListener('mouseenter', () => {
      marker.getElement().getElementsByTagName("g")[2].setAttribute('fill', 'black')
    })

    storyDiv.addEventListener('mouseleave', () => {
      marker.getElement().getElementsByTagName("g")[2].setAttribute('fill', '#3FB1CE')
    })

    storyDiv.addEventListener('click', () => {
      map.flyTo({
        center: data.coordinates[0],
        zoom: 14,
        speed: .8,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    })  

    marker.getElement().addEventListener('click', () => {
      console.log(data.geo_facet)
    });
  
  });

};