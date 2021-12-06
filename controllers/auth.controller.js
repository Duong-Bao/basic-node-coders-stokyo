const md5 = require('md5');//thư viện mã hóa password gửi lên 
const db = require('../db');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  // @ts-ignore
  var user = db.get('users').find({email: email}).value();
  if(!user){
   res.render('auth/login',{
       errors: [
           'User does not exist.'
       ],
       values: req.body
   });
   return;
  }
  
  var hashedPassword = md5(password); // cách mã hóa mới md5

  if(user.password !== hashedPassword){
    res.render('auth/login',{
        errors: [
            'Wrong password.'
        ],
        values: req.body     
    });
    return;
  }
   
  res.cookie('userId', user.id, {
    signed: true
  }); //set cho user cookie để gửi về  
  
  res.redirect('/users'); // nếu login được thì chuyển sang trang users
}; 