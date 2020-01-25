const axios = require('axios')
const qs = require('qs');
module.exports = {
    
    check: async(req, res) => {
        const response = await axios.get('http://api.waqi.info/feed/bangkok/?token=09f82f33ee9894648d3e8e911b142061c85889b0');
        if (response ){
            let data =  response.data
            if (data.data.iaqi.pm25){
                let pm25 = data.data.iaqi.pm25.v
                if (pm25 > 100){
                    const msg = {message : 'Bangkok Air Quality = ' + pm25 };
                    const options = {
                        method: 'POST',
                        headers: { 
                            'content-type': 'application/x-www-form-urlencoded',
                            'Authorization' : 'Bearer 7E3WnxG6Cx5bpQJh1Sq0Obm41tVkCt4J3ZsSyXULtnO' },
                        data: qs.stringify(msg)
                    };
                    try {
                        await axios.post('https://notify-api.line.me/api/notify', qs.stringify(msg), options)
                    }
                    catch (e){
                        console.log(e)
                    }
                }
                
                res.json(data.data.iaqi.pm25)
            } else {
                res.json('error: no data')
            }
            
        } else {
            res.json('error')
        }
        
    }
}