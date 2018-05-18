const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a : {
      demand : true,
      alias : 'address',
      description : 'Address to fetch weather for',
      string : true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'+
'key=AIzaSyA6gODLYUi6Kkpw8ZQ2BMuTUKnYH9C9t88&address='+encodedAddress;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/191d43e3b7354198bf9e0546cd56e985/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}.It feels like
  ${apparentTemperature}`);
}).catch((error) => {
  if(error.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers.');
  }else{
    console.log(error.message);
  }
});
