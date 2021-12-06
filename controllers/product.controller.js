// const db = require('../db');
var Product = require('../models/product.model')

module.exports.product = async(req, res, next) => {
    // var page = parseInt(req.query.page) || 1; //lấy giá trị query gửi lên và không có giá trị thì ta cho nó là 1 
    // var perPage = 8; // x nghĩa là lấy 8 sản phẩm ra 

    // var start = (page - 1) * perPage; //lấy key của mảng
    // var end = page * perPage; // giá trị cuối của mảng

    // var drop = (page - 1) * perPage; //biến này được dùng trong thư viện lodash

    // res.render('product/index', {
    //     // products: db.get('products').value().slice(start, end) //sử dụng theo cách thông thường
    //     // @ts-ignore
    //     products: db.get('products').drop(drop).take(perPage).value() // sử dung thử viện lodash 
    // });
    try { // cách truy xuất lỗi và render ra lỗi đó ở phía clien
        var products = await Product.find();
        // products.foo();
        res.render('products/index', {
            products: products
        })
    } catch (error) {
        next(error); //cái next này nó sẽ gửi sang cái middleware tiếp theo   
    }
}