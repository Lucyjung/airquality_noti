const express = require('express');
const app = express()
const routes = require('./routes');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});


app.use(bodyParser.json());
app.use(urlencodedParser);


app.use('/', routes);
app.listen(port, () => console.log(`AQI app listening on port ${port}!`))