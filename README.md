# News map

A map that shows news stories around me. 

News stories, geo-tagged and displayed on a map

### To do
- [x] Create layout
- [x] Add map
- [x] Add dummy stories
- [x] Add JavaScript object to project
- [x] Add pins to map
- [ ] Connect dummy stories to pins
- [ ] Click on pin and highlight the story
- [ ] Click the story and center the map on the pin
- [ ] Figure out how to get news stories and add location
- [ ] Figure out how to do this automatically every day, from different news sources
- [ ] Working site for Portland, then try to do it for other locations
- [ ] Add geocoder to map
- [ ] Tests

#### June 06, 2020
![Page outline view](./img/2020.06.06-Page-outline.png)

#### June 07, 2020
![Map in map pane](./img/2020.06.07-Map-in-map-pane.png)

#### June 08, 2020
Created a CSV with 10 stories, converted it to GeoJSON, and used Fetch to read it as an object. Now I can define a binding and point it to this object.
![2020.06.08-Object-in-console](./img/2020.06.08-Object-in-console.png)

#### June 12, 2020
Ended up not defining a binding. Used `forEach` to add the coordinates to the map.
![2020.06.12-Markers-on-map](./img/2020.06.12-Markers-on-map.png)

#### June 13, 2020
The stories and markers now populate from the JSON file. The `createStory` function first adds a marker to the map based off of the coordinates then creates a div element and sets the values for the story fields. Last, it adds the story to the side panel.
![2020.06.13-Stories](./img/2020.06.13-Stories.png)