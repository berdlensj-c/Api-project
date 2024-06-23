/*
(c) 2022 Louis. D. Nel

NOTE: You need to install the npm modules by executing >npm install
before running this server

Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT


let API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' //<== YOUR API KEY HERE

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes

app.get(['/', '/mytunes.html', '/mytunes', '/index.html'], (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//handles API request
app.get('/songs', (request, response) => {
  let songTitle = request.query.title;
  if (!songTitle) {
    response.json({message: 'Please enter a song title'});
    return;
  }

  const titleWithPlusSigns = songTitle.replace(/\s/g, '+');
  const options = {
    host: 'itunes.apple.com',
    path: `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=20`,
    method: 'GET',
    "port": null,
    "useQueryString": true
  };

  http.request(options, function(apiResponse) {
    let songData = '';
    apiResponse.on('data', function(chunk) {
      songData += chunk;
    });
    apiResponse.on('end', function() {
      response.contentType('application/json').json(JSON.parse(songData));
    });
  }).end();
});


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log("http://localhost:3000/mytunes.html")
    console.log("http://localhost:3000/mytunes")
    console.log("http://localhost:3000/index.html")
    console.log("http://localhost:3000/")
    console.log("http://localhost:3000")
  
  }
})
