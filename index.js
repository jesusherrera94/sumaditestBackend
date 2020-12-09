var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request'),
    apiKey = 'acc_5d8243b1ab24607',
    apiSecret = 'f7fbe1c5be454f3f269eaacb0298f748' 

app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/image',(req, res)=>{

    console.log('Entered');

    request.post({url:'https://api.imagga.com/v2/tags', formData: {image_base64: req.body.image} },
    function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        res.send(body);
    }).auth(apiKey, apiSecret, true);
})

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 3000!');
});