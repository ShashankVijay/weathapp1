const request = require('request')

const fc =
(lon,lat,place,cb)=>
{
    const url = 'https://api.darksky.net/forecast/98964a26c490181ccc50bc6e0dbf9a04/'+lat.toString()+','+lon.toString()

    request
    (
        {
            url,
            json:true
        },
        (error,{body:bod})=>
        {
        
                const forecastobj = 
                {
                    place,
                    summary:bod.currently.summary,
                    temperature:Math.round(bod.currently.temperature),
                    rain:bod.currently.precipProbability.toString()+'%'
                }
                cb(undefined,forecastobj)
            
        }
    )
}
module.exports = fc;