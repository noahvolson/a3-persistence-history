const express = require("express");

// added middleware
const bodyParser = require("body-parser");  // 1
const favicon = require("serve-favicon");   // 2
const helmet = require("helmet");           // 3
const morgan = require("morgan");           // 4 //TODO Only log user login requests

const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.use(helmet({contentSecurityPolicy: false}))

app.use(morgan('combined'));

app.use(favicon(__dirname + "/public/favicon.ico"));

// make all the files in 'public' available
app.use(express.static("public"));

// for when /index.html not specified
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.post("/add", bodyParser.json(), (request, response) => {
  dreams.push(request.body.dream);
  response.json(request.body);
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
