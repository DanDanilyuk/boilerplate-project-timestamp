// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (_req, res) => {
  const date = new Date();
  
  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  let date;
  if (isNumeric(req.params.date)) {
    const dateInt = parseInt(req.params.date);
    date = new Date(dateInt);
  } else {
    date = new Date(req.params.date);
  }  

  if (isNaN(date)) {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
