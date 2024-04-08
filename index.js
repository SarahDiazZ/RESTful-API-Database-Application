var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));
}
main().then(function() {
    console.log("Mongoose Connected");
}).catch(err => console.log(err));

var movieModel = require("./models/movie");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

//Page that lets users enter title, genre, release date, and rating of a movie
app.get("/form", function(req, res) {
    res.render("pages/form");
});

//lists all movies that were added into the database
app.get("/theater", function(req, res) {
    movieModel.listAllMovies().then(function(movies) {
        res.render("pages/theater", {movies:movies});
    });
});

//Query: Searches for movies before a given date/year
app.get("/before/:Release_Date", function(req, res) {
    movieModel.find({Release_Date: {$lt : req.params.Release_Date}}).then(function(movies) {
        res.render("pages/theater", {movies:movies});
    });
});


app.post('/movie', function(req, res) {
    console.log("Movie: " + JSON.stringify(req.body.movie));
    var newMovie = new movieModel(req.body.movie);

    newMovie.save().then(function() {
        res.send("Added a new movie to the Database");
    });
});

app.listen(port, function() {
    console.log("App listening on port " + port);
});

