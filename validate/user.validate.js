module.exports.postCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name){  
        errors.push('Name is required.');
    } 
    if (!req.body.phone){
        errors.push('Phone is required');  
    }
    if (errors.length > 0){
        res.render('users/create',{
            errors: errors,
            values:req.body
        });  
        return;     
    }

    res.locals.success = true; // chuyển dữ biến từ middleware này sang middleware sau 

    next(); //tham số này dùng để chuyển đến function tiếp theo và đã chạy hết các logic trên kia không có lỗi nào hết  
}