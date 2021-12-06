var db = require('../db'); // đây là thư viện database(lowdb)

//middleware này dùng để check xem cookie có được gửi lên hay không 
module.exports.requireAuth = function(req, res, next) {
    // console.log(req.cookies,req.signedCookies.userId);
    if (!req.signedCookies.userId) { // req cái cookie userID gửi lên nếu đúng thì cho qua 
        res.redirect('/auth/login'); // không có user cookie thì chuyển người ta về trang users login 
        return; // return để nó không chạy logic bên dưới 
    }
    // @ts-ignore
    var user = db.get('users').find({
        id: req.signedCookies.userId
    }).value(); // tìm req cookie userID gửi lên từ clien so sách với database và trả ra kiểu dữ liệu boolean 

    if (!user) { //nếu không tìm thấy user thì redirect sang trang khác  
        res.redirect('auth/login');
        return;
    }

    res.locals.user = user;

    next(); //nếu mà tìm được userID lúc này chúng ta next cho chạy qua cái middleware tiêp theo  
}