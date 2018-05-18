const request = require('request');

var getWeather = (lat,lng,callback) => {
  request({
    url: `https://api.darksky.net/forecast/191d43e3b7354198bf9e0546cd56e985/${lat},${lng}`,
    json: true
  },(error,response,body) => {
    if(error){
      callback('Unable to connect to forecast.io server');
    }else{
      if(!error && response.statusCode === 200){
        callback(undefined,{
          temperature: body.currently.temperature,
          actualTemperature: body.currently.apparentTemperature
        });
      }else{
        callback('Unable to fetch weather');
      }
    }
  });
};

module.exports.getWeather = getWeather;
