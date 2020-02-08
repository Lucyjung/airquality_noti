const axios = require('axios')
const qs = require('qs');
module.exports = {
    
    check: async(req, res) => {
        const response = await axios.get('http://api.waqi.info/feed/bangkok/?token=09f82f33ee9894648d3e8e911b142061c85889b0');
        const response1 = await axios.get('http://api.waqi.info/feed/geo:13.817673;100.5558123/?token=09f82f33ee9894648d3e8e911b142061c85889b0')
        if (response && response1){
            let data =  response.data
            let data1 =  response1.data
            if (data.data.iaqi.pm25 && data1.data.iaqi.pm25){
                let pm25 = data.data.iaqi.pm25.v
                let mochitpm25 = data1.data.iaqi.pm25.v
                const msg = {message : 'Bangkok Air Quality = ' + pm25 + '\nMochit Air Quality = ' + mochitpm25};
                const options = {
                    method: 'POST',
                    headers: { 
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization' : 'Bearer P45GgbT7FanD20juJiKSJauI4Zn0HGtltZ6stvdSXfe' },
                    data: qs.stringify(msg)
                };
                try {
                    await axios.post('https://notify-api.line.me/api/notify', qs.stringify(msg), options)
                }
                catch (e){
                    console.log(e)
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