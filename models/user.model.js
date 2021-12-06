var mongoose = require('mongoose'); //thử viện mongoose vào để sử dụng được những module của nó

var userSchema = new mongoose.Schema({ //dùng để khai báo những biến có trong object của chúng ta  
        email: String,
        password: String,
        name: String,
        avatar: String,
        phone: String
    }) // nó cũng được dùng để làm sạch dữ liệu hoặc validate

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;