const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5rdXI0OTkiLCJhIjoiY2sxMXBjbWV4MGo4MzNrcjB4N3ozZmE2eSJ9.a8exGlO6ovt9ll5oJ59BeQ'
    request({url: url,json: true},(error,{body}) =>{
        if (error) {
           callback('Unable to Connect to Location Service',undefined)
        } else if (body.message){
            callback(body.message,undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location',undefined)
        } else {
           callback(undefined,{
               latitude : body.features[0].center[1],
               longitude : body.features[0].center[0],
               location : body.features[0].place_name
           })
        }
    })
}

module.exports = geocode