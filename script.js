// INITIALIZE MAPBOX
mapboxgl.accessToken = 'pk.eyJ1IjoibWFydC1hbnRob255IiwiYSI6ImNrbnNnemZ0MDA5dWYyd3Q5ODBoa3lnZHMifQ.uIzVCMi2fXKHNrCKc7BkRA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 1.5,
  center: [0, 20]
});


// LOCAL DATA ARRAY STORAGE
let summary = []


// GET REQUEST -> COVID19 API
fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then(data => {
    if(data.Countries.length === 0){
      document.querySelector('.error-popup').style.display = 'flex'
    }
    summary = data
    init()
  }).catch(err=>{
    console.log(err)
    document.querySelector('.error-popup').style.display = 'flex'
    // location.assign("./error.html")
  })

// DECIDE MARKER COLORS BASED ON TOTAL DEATHS PER COUNTRY
function markerColors(totalDeaths){
  if(totalDeaths >= 500) return 'Red'
  if(totalDeaths >= 200) return 'Orange'
  else return 'Yellow'
}

// CONVERT COUNTRY NAME TO coordinates
// ADD MARKERS TO MAP USING COORDINATES
function init(){
  summary.Countries.forEach(country => {
    
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country.Country}.json?access_token=pk.eyJ1IjoibWFydC1hbnRob255IiwiYSI6ImNrbnNnemZ0MDA5dWYyd3Q5ODBoa3lnZHMifQ.uIzVCMi2fXKHNrCKc7BkRA`)
    .then(response => response.json())
    .then(data => {
      country.coordinates = data.features[0].center
      country.long = data.features[0].center[0]
      country.lat = data.features[0].center[1]
      
      console.log(country)


      const popup = new mapboxgl.Popup()
      popup.setHTML(`<h2>Country: ${country.Country}</h2>
                      <h3>Confirmed Cases : <span>${country.TotalConfirmed}</span></h3>
                      <h3>Total Deaths    : <span>${country.TotalDeaths}</span></h3>
                      <h3>Total Recovered : <span>${country.TotalRecovered}</span></h3>
                      <h3>New Confirmed   : <span>${country.NewConfirmed}</span></h3>
                      <h3>New Deaths      : <span>${country.NewDeaths}</span></h3>
                      <h3>New Recovered   : <span>${country.NewRecovered}</span></h3>`)

      new mapboxgl.Marker({
        color: markerColors(country.TotalDeaths)
      }).setLngLat([country.long, country.lat]).setPopup(popup).addTo(map)

    })
  })
}

