const request = require('request');

const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=68a3a12c5e8c582e643dd2d91063e6ca&query='+lat+','+long+'&units=f';    
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Cannot connect to weather service', undefined)
        }
        else if(body.error){
            callback('Cannot find forecast - try again later', undefined)
        } else {
        callback(undefined, {
            Conditions: body.current.weather_descriptions[0],
            Real_Temperature: body.current.temperature,
            Feels_Like: body.current.feelslike
        }
            );
        }
    }) 
}

module.exports = forecast;

