// Require the Express Module
var express = require('express');

// Create an Express App
var app = express();

var session = require('express-session');
var sessionStore = new session.MemoryStore;
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}));

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// Integrate body-parser with our App
app.use(bodyParser.json())

// Require path
var path = require('path');

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, '/public/dist')));

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/belt1');
mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    score: {type: Number},

}, {timestamps: true });

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

var QuestionSchema = new mongoose.Schema({
    question: {type: String, minlength: 15, required: true},
    correct: {type: String, required: true},
    fake1: {type: String, required: true},
    fake2: {type: String, required: true},

}, {timestamps: true });

mongoose.model('Question', QuestionSchema);
var Question = mongoose.model('Question');

// Routes

// Registers a new user.
app.post('/register', (req, res, next) => {
    new User(req.body).save()
    .then((user) => {
        console.log(user)
        req.session.name = user.name;
        req.session.user_id = user._id;
        res.json(true);
    }).catch((err) => {
        console.log(err, "@@@@@@@@@@@@")
        res.json(err);
    });
});

// Creates a new question.
app.post('/newQuestion', (req, res, next) => {
    new Question(req.body).save()
    .then((question) => {
        console.log("Made new Question");
    }).catch((err) => {
        console.log(err)
        res.json(err);
    });
});

// Retrieves all of the questions.
app.get('/getQuestions', (req, res, next) => {
    Question.find({}, (err, questions) => {
        if(err) {
            res.json(err);
        }else {
            res.json(questions);
        }
    })
});

// Retrieves all of the users.
app.get('/getUsers', (req, res, next) => {
    User.find({}, (err, users) => {
        if(err) {
            res.json(err);
        }else {
            res.json(users);
        }
    }).sort({score: -1})
});

app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.json(true);
});

app.get('/current', (req, res, next) => {
    if(req.session.user_id) {
        let curr = {
            id: req.session.user_id,
            name: req.session.name
        };
        res.json(curr);
    }else {
        res.status(418).json({error: "Login to view that page."});
    }
});

app.post('/score', (req, res, next) => {
    let score = req.headers.score;
    User.update({_id: req.session.user_id}, {score: score}, function(err) {
        if(err) {
            console.log(err)
        }else {
            res.json();
        }
    });
});

// Redirects to angular components.
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});