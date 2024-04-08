var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    Title: String,
    Genre: String,
    Release_Date: {
        type: Date,
        get: function(date) {
            return date.toISOString().split('T')[0];
        }
    },
    Rating: Number
});

movieSchema.statics.listAllMovies = function() {
    return this.find({});
};

var movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;