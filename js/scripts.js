// Load mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWFubnkiLCJhIjoiMzBCNHFQUSJ9.VQQ9ZSW7viFT1yLhLiWLSA';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-122.658722, 45.512230], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

// let STORIES = '';
// // Load stories.geojson file from the data directory
// fetch('/news-map/data/stories.geojson')
  
//   // .then(response => response.json())
//   .then(function(response) {
//     return response.json()
//   })

//   // .then(data => STORIES = data)
//   .then(function(data) {
//     STORIES = data;
//   })

//   // .then(() => console.log(STORIES));

//   .then(function() {
//     console.log(STORIES);
//     console.log("test");
//   })

//   console.log(typeof(STORIES))
//   console.log(STORIES)
  
  // console logs the coordinates of the first item in the object
  // .then(() => console.log(STORIES.features[0].geometry.coordinates));

console.log("end")

// // Gets the fullname of the customer from an id.
// function tj_customer_name() {
//   let customer_name = '';

//   return fetch('/news-map/data/stories.geojson')
//   .then((response) => {
//     if(response.ok) {
//         return response.json();
//     } else {
//         throw new Error('Server response wasn\'t OK');
//     }
//   })
//   .then((json) => {
//     // return json.first_name.concat(' ').concat(json.last_name);
//     return json
//   });
// }

// tj_customer_name().then(fullName => {
//     console.log(fullName);
// });

// Return the promise chain created in the function and return the json in a variable storyThing
// function storyObject() {
//   return fetch('/news-map/data/stories.geojson')
//    .then((response) => {
//     if(response.ok) {
//       return response.json();
//     } else {
//         throw new Error('Server response wasn\'t OK');
//    }
//  })
//    .then((json) => {
//       let storyThing = json;
//       console.log(storyThing)
//       return storyThing;
//    })
// };

// // Calll this
// storyObject().then((storyThing) => storyThing = storyObject)
// //This does not work. Variable storyThing is not defined. It only exists inside of the .then
// console.log(storyThing)









// let jsondata;
// fetch('/news-map/data/stories.geojson').then(
//   function(u) {
//     return u.json();
//   }).then(
//   function(json) {
//     jsondata = json
//   })

//   console.log(jsondata)







async function getData(url) {
    const response = await fetch(url);

    return response.json()
}

async function main() {
    const data = await getData('/news-map/data/stories.geojson');

    console.log("rest")
}