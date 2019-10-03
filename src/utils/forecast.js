const request = require('request')

const forecast = ( latitude , longitude , callback ) => {
    const url = 'https://api.darksky.net/forecast/5f4baafd9932c296bba6a5f6625ff599/'+latitude+','+longitude+'?units=si'
    request({ url: url, json: true }, (error, {body} ) => {
        if ( error ) {
           callback('Unable to Connect to Forecasting Service',undefined)
        } else if ( body.error ){
            callback(body.error,undefined)
        } else {
           callback( undefined, 
            body.daily.data[0].summary+' It is currently '
            +body.currently.temperature+' degrees out. There is a '
            +(body.currently.precipProbability*100)+'% chance of rain')
        }
    })
}


module.exports = forecast