var mongoose = require('mongoose')

var drawingSchema = new mongoose.Schema({
    src: String,
});
  
module.exports = new mongoose.model('Drawing', drawingSchema)