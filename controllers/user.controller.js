const db = require('../db')
const shortid = require('shortid');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function(req, res) {
    var q = req.query.q; //được dùng đê lấy giá tử sau (key) p "xem VD sẽ rõ" 
    var matchedUsers = db.get('users').value().filter(function(user) {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        }) // biến này dùng để tìm kiếm 
    res.render('users/index', {
            users: matchedUsers
        }) //hàm này dùng để trả về dữ liệu đã tìm kiếm trong trang users/index
}

module.exports.create = function(req, res) {
    // console.log(req.cookies);
    res.render('users/create')
}

module.exports.get = function(req, res) { //hàm này được dùng để lấy dữ liệu về từ server
    var id = req.params.id; // biến này được dùng để lấy id của từng user khi người dùng ở trang users và click vào danh sách tên của mình
    // @ts-ignore
    var user = db.get('users').find({ id: id }).value(); // biến này được dùng để tìm kiếm thông tin người dùng qua id người dùng khi click vào   
    res.render('users/view', { // hàm này được dùng để truyền dữ liệu đến trang users/view
        user: user
    });
}

module.exports.postCreate = function(req, res) { //hàm này được dùng để lấy dữ liệu từ form 
    req.body.id = shortid.generate(); // hàm này của thử viện shortid được dùng để tạo id cho từng giá trị một các khẩu nhiên
    // console.log(res.locals);
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\') //hàm chuyển đồi đừng dẫn để view ảnh
        // @ts-ignore
    db.get('users').push(req.body).write(); // hàm này của thư viện lowdb được dùng để lưu giá trị được gửi lên
    res.redirect('/users'); // hàm này của express được dùng để chuyển trang /user khi hoàn thành lưu tên người dùng
}