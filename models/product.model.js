var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Product = mongoose.model('User', userSchema, 'products');

module.exports = Product;