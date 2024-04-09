var mongoose = require("mongoose");

//Creates the schema for mongoDB
var movieSchema = new mongoose.Schema({
    Title: String,
    Genre: String,
    Release_Date: {
        type: Date,
        get: function(date) {
            return date.toISOString().split('T')[0]; //only shows the date, removes the time
        }
    },
    Rating: Number
});

movieSchema.statics.listAllMovies = function() {
    return this.find({});
};

var movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;