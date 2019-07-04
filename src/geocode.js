const request = require('request')

const gc=
(adr,cb)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adr)+'.json?access_token=pk.eyJ1Ijoic2hhc2hhbmstdmlqYXkwMSIsImEiOiJjanhhbjFxdDcxOGpjM3NzeGRwZHZiMjQwIn0.5Rz5slLtI9NYFRNQWBIzjg&limit=1'
    request
    (
        {
            url,
            json:true
        },
        (error,response)=>
        {
            if(error)
            {
                cb({error : 'Unable to connect to the Internet!'},undefined)
            }
            else if(response.body.features.length === 0)
            {
                cb({error : 'Unable to fetch the weather for that place, try another one.'},undefined)
            }
            else
            {
                const data=
                {
                    lat : response.body.features[0].center[1],
                    long : response.body.features[0].center[0],
                    loc : response.body.features[0].place_name
                }
                cb(undefined,data)
            }
        }
    )
}
module.exports = gc;