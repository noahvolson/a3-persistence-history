const express = require("express");

// added middleware
const bodyParser = require("body-parser");                  // 1
const favicon = require("serve-favicon");                   // 2
const helmet = require("helmet");                           // 3
const morgan = require("morgan");                           // 4
const GitHubStrategy = require('passport-github').Strategy; // 5
const cookieParser = require('cookie-parser');              // 6
const session = require('express-session');                 // 7


const passport = require("passport");
const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

////////////////////////////////////////////////////////////////////// Middleware
app.use(helmet({contentSecurityPolicy: false}))

//app.use(morgan('combined'));

app.use(favicon(__dirname + "/public/favicon.ico"));

// make all the files in 'public' available
app.use(express.static("public"));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    async function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));
passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    }));

app.use(passport.initialize());

////////////////////////////////////////////////////////////////////// Routes

app.get("/", (request, response) => {
    if (request.session.login) { // if user has logged in
        response.sendFile(__dirname + "/views/index.html");
    }
    else {
        response.sendFile(__dirname + "/views/login.html");
    }
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log("Hello " + req.user.username);
        req.session.login = req.user.username;
        res.redirect('/');
});

app.get("/logout", (request, response) => {
    request.session.destroy();
    console.log("log out requested");
    response.redirect('/');
});

// send the array of dreams to the webpage
app.get("/dreams", (request, response) => {
  response.json(dreams);
});

app.post("/add", bodyParser.json(), (request, response) => {
  dreams.push(request.session.login + " " + request.body.dream);
  response.json(request.body);
});

// listen for requests
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

////////////////////////////////////////////////////////////////////// Database

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://noahvolson:${process.env.DB_PASSWORD}@cluster0.mbhva.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection = null;
client.connect(err => {
    collection = client.db("testDatabase").collection("testCollection");
    //console.log(collection);
});
