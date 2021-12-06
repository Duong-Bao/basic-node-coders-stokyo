var Product = require('../../models/product.model')

module.exports.product = async(req, res) => {
    var products = await Product.find();
    res.json(products);
}

module.exports.create = async(req, res) => {
    var product = await Product.create(req.body);
    res.json(product);
}